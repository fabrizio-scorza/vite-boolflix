<script>
    import {store} from '../../store'
    export default {
        data(){
            return{
                store,
            }
        }    
    }
</script>

<template>
    <ul>
        <li v-for="movie in store.db" :key="movie.id">
            <h2>
                {{ movie.title }}
            </h2>
            <h4>
                {{ movie.original_title }}
            </h4>
            <p>
                {{ movie.original_language }}
            </p>
            <p>
                {{ movie.vote_average }}
            </p>
        </li>
    </ul>
</template>

<style lang="scss" scoped>

</style>