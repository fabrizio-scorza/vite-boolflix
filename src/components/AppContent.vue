<script>
import { store } from '../../store'
export default {
    data() {
        return {
            store,
            lang: ['en', 'it', 'ja']
        }
    },
}
</script>

<template>
    <!-- <pre>{{ store.db }}</pre> -->
    <ul>
        <li v-for="movie in store.db" :key="movie.id">
            <h2>
                {{ movie.title || movie.name }}
            </h2>
            <h4>
                {{ movie.original_title || movie.original_name }}
            </h4>
            <p v-if="lang.includes(movie.original_language)">
                <img :src="`/${movie.original_language}.png`" alt="">
            </p>
            <p v-else>
                {{ movie.original_language }}
            </p>
            <p>
                {{ movie.vote_average }}
            </p>
        </li>
    </ul>
</template>

<style lang="scss" scoped></style>