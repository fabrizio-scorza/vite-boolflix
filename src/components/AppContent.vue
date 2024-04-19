<script>
import axios from 'axios';
import { store } from '../../store';
import ItemCard from './ItemCard.vue';

export default {
    components: {
        ItemCard,
    },
    data() {
        return {
            store,
        }
    }, mounted() {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${store.apiKey}&language=${store.language}`).then(res => {
            const data = res.data.results;
            this.store.moviesDb = data;
        });
        axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${store.apiKey}&language=${store.language}`).then(res => {
            const data = res.data.results;
            this.store.seriesDb = data;
        })
    }

}
</script>

<template>
    <!-- <pre>{{ store.db }}</pre> -->
    <ul class="flex card-wrapper">
        <ItemCard v-for="movie in store.moviesDb" :key="movie.id" :item="movie" />
        <ItemCard v-for="series in store.seriesDb" :key="series.id" :item="series" />
    </ul>
    <div v-if="store.stringToSearch == ''" class="flex card-wrapper">
        <p>Nessun elemento trovato</p>
    </div>
</template>

<style lang="scss" scoped>
.card-wrapper {
    justify-content: center;
}
</style>