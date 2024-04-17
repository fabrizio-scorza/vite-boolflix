<script>
//import della libreria di axios e dello store
import axios from 'axios'
import { store } from '../../store'

export default {
    data() {
        return {
            store,
            searchThis: '',
        }
    },
    methods: {
        // metodo che chiama tramite axios le due api e assegna a due array i dati ricevuti
        fetchList() {
            //prima chiamata api film inseiti nell'array film
            const promise1 = this.callThis('https://api.themoviedb.org/3/search/movie');

            //seconda chiamata api serie tv inserite nell'array serie
            const promise2 = this.callThis('https://api.themoviedb.org/3/search/tv');

            //aspetto le promise di entrambi i get prima di fare il then dei due array
            Promise.all([promise1, promise2]).then(responses => {
                // primo risultato in movies db
                const data1 = responses[0].data.results;
                this.store.moviesDb = data1;
                console.log(this.store.moviesDb);

                // secondo risultato in series db
                const data2 = responses[1].data.results;
                this.store.seriesDb = data2;
                console.log(this.store.seriesDb);

                // concatenamento dei due array in un unico array
                this.store.db = this.store.moviesDb.concat(this.store.seriesDb);
                console.log(this.store.db);
            })
        },
        callThis(link) {
            // metodo generico per chiamare l'api tramite axiox
            const promise = axios.get(link,
                {
                    params: {
                        api_key: store.apiKey,
                        query: this.searchThis,
                        language: store.language,
                        page: store.page
                    }
                })
            return promise
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="flex navbar">
            <!--logo searchbar e bottone di ricerca -->
            <div class="flex logo">
                <font-awesome-icon :icon="['fas', 'film']" />
                <h1>boolflix</h1>
            </div>
            <div class="flex">
                <input type="text" class="searchbar" v-model.trim="searchThis" name="search">
                <button @click="fetchList()" class="btn">Cerca</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.logo {
    color: red;
    align-items: center;
    font-size: 32px;
    text-shadow: 4px 2px 10px gray;
}

.navbar {
    margin: 15px;
    justify-content: space-between;
    align-items: baseline;
}

.searchbar {
    width: 300px;
    font-size: 16px;
    line-height: 24px;
    padding-left: 8px;

    &:focus-visible {
        outline: none;
    }
}

.btn {
    width: 70px;
    height: 28px;
    background-color: red;
    border-radius: 15px;
    color: white;
    border: none;
    cursor: pointer;
}
</style>