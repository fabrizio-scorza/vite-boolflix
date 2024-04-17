<script>
export default {
    props: ['item'],
    data() {
        return {
            lang: ['en', 'it', 'ja'],
        }
    },
    methods: {
        starCalc(vote) {
            vote = Math.ceil(vote / 2);
            return vote
        },
        emptyStarCalc(vote) {
            vote = Math.ceil(vote / 2);
            const emptyVote = 5 - vote;
            return emptyVote
        }

    }
}
</script>

<template>
    <li class="card">
        <div class="card-head">
            <img :src="`https://image.tmdb.org/t/p/w342/${item.poster_path}`" alt="">
        </div>
        <div class="card-body">
            <h2>
                {{ item.title || item.name }}
            </h2>
            <h4>
                {{ item.original_title || item.original_name }}
            </h4>
            <p v-if="lang.includes(item.original_language)">
                <img :src="`/${item.original_language}.png`" alt="">
            </p>
            <p v-else>
                {{ item.original_language }}
            </p>
            <p>
                <font-awesome-icon v-for="n in starCalc(item.vote_average)" :key="n" icon="fa-solid fa-star" />
                <font-awesome-icon v-for="n in emptyStarCalc(item.vote_average)" :key="n" icon="fa-regular fa-star" />
            </p>
        </div>
    </li>
</template>

<style lang="scss" scoped></style>