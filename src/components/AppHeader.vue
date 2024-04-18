<script>
//import della libreria di axios e dello store
import axios from 'axios';
import { store } from '../../store';

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
            this.callThis('https://api.themoviedb.org/3/search/movie').then(res => {
                const data = res.data.results;
                this.store.moviesDb = data;
            });

            //seconda chiamata api serie tv inserite nell'array serie
            this.callThis('https://api.themoviedb.org/3/search/tv').then(res => {
                const data = res.data.results;
                this.store.seriesDb = data;
            });
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
            return promise;
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