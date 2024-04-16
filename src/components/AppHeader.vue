<script>
//import della libreria di axios e dello store
import axios from 'axios'
import { store } from '../../store'

export default {
    data() {
        return {
            store,
            searchThis: '',
            apiKey: '7d0a43d485e86b97c1bff5bec83fa48b',
            language: 'it-IT',
            page: '1',
        }
    },
    methods: {
        // metodo che chiama tramite axios le due api e assegna a due array i dati ricevuti
        fetchList() {
            //prima chiamata api film inseiti nell'array film
            const promise1 = axios.get('https://api.themoviedb.org/3/search/movie',
                {
                    params: {
                        api_key: this.apiKey,
                        query: this.searchThis,
                        language: this.language,
                        page: this.page
                    }
                })
            //seconda chiamata api serie tv inserite nell'array serie
            const promise2 = axios.get('https://api.themoviedb.org/3/search/tv',
                {
                    params: {
                        api_key: this.apiKey,
                        query: this.searchThis,
                        language: this.language,
                        page: this.page
                    }
                })
            //aspetto le promise di entrambi i get prima di fare il then dei due array
            Promise.all([promise1, promise2]).then(responses => {
                console.log(responses);
                const data1 = responses[0].data.results;
                this.store.moviesDb = data1;
                const data2 = responses[1].data.results;
                this.store.seriesDb = data2;
                // concatenamento dei due array in un unico array
                this.store.db = this.store.moviesDb.concat(this.store.seriesDb);
            })
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="flex">
            <!-- searchbar e bottone di ricerca -->
            <input type="text" class="searchbar" v-model.trim="searchThis" name="search">
            <button @click="fetchList()" class="btn">Cerca</button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>