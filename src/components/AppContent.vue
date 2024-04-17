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
    <ul class="flex">
        <ItemCard v-for="movie in store.db" :key="movie.id" :item="movie" />
    </ul>
</template>

<style lang="scss" scoped></style>