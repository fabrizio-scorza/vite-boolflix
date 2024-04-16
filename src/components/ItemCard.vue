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
            let starString = '';
            vote = Math.ceil(vote / 2);
            let emptyVote = 5 - vote;

            for (let i = 0; i < vote; i++) {
                starString += '<i class="fa-solid fa-star"></i>'
            }
            for (let i = 0; i < emptyVote; i++) {
                starString += '<i class="fa-regular fa-star"></i>'
            }
            return vote, emptyVote, starString;
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
            <p v-html="starCalc(item.vote_average)">
            </p>
        </div>
    </li>
</template>

<style lang="scss" scoped></style>