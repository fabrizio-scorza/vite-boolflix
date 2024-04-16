<script>
    //import della libreria di axios e dello store
    import axios from 'axios'
    import {store} from '../../store'

    export default {
        data(){
            return{
                store,
                searchThis:'',
                apiKey:'7d0a43d485e86b97c1bff5bec83fa48b',
                language:'it-IT',
                page:'1',
            }
        },
        methods:{
            fetchList(){
                axios.get('https://api.themoviedb.org/3/search/movie',
                    {
                        params:{
                            api_key: this.apiKey,
                            query: this.searchThis,
                            language: this.language,
                            page: this.page
                        }
                }).then((res) =>{
                    const data = res.data;
                    this.store.db = data;
                    console.log(data);
                })
            }
        }
    }
</script>

<template>
    <div class="container">
        <div class="flex">
            <!-- searchbar e bottone di ricerca -->
            <input type="text" class="searchbar" v-model.trim="searchThis">
            <button @click="fetchList()" class="btn">Cerca</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>