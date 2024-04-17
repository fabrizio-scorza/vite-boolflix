<script>
import { store } from '../../store'
import ItemCard from './ItemCard.vue'

export default {
    components: {
        ItemCard,
    },
    data() {
        return {
            store,
        }
    }
}
</script>

<template>
    <!-- <pre>{{ store.db }}</pre> -->
    <ul class="flex card-wrapper">
        <ItemCard v-for="movie in store.db" :key="movie.id" :item="movie" />
    </ul>
</template>

<style lang="scss" scoped>
.card-wrapper {
    justify-content: center;
}
</style>