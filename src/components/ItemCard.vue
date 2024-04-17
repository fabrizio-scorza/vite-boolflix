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
    <!-- elemento card list item -->
    <li class="card" v-if="item.poster_path != null">
        <!-- card head con l'immagine -->
        <div class="card-head overlay">
            <img :src="`https://image.tmdb.org/t/p/w342/${item.poster_path}`" alt="">
        </div>
        <div class="flex card-body overlay">
            <!-- card body con i dettagli del film/serie tv -->
            <h2>
                <!-- titolo -->
                <span>Titolo:</span>
                <span>{{ item.title || item.name }}</span>
            </h2>
            <h4>
                <!-- titolo in lingua originale -->
                <span>Titolo originale:</span>
                <span>{{ item.original_title || item.original_name }}</span>
            </h4>
            <p>
                <!-- descrizione -->
                <span>Descrizione:</span>
                <span>{{ item.overview }}</span>
            </p>
            <p class="card-body-flex">
                <!-- paragrafo contenete se lpecifiche di lingua e voto -->
                <span v-if="lang.includes(item.original_language)" class="card-body-flex">
                    <!-- controllo della lingua se inclusa nell'array lang per mettere la bandiera alò posto della stringa -->
                    <span>Lingua originale:</span>
                    <img :src="`/${item.original_language}.png`" alt="">
                </span>
                <span v-else class="card-body-flex">
                    <!-- in caso contrario resta la stringa -->
                    <span>Lingua originale:</span>
                    <span>{{ item.original_language.toUpperCase() }}</span>
                </span>
                <!-- voto calcolato con i metodi stelle piene e stelle vuote -->
                <span>Voto:</span>
                <font-awesome-icon v-for="n in starCalc(item.vote_average)" :key="n" icon="fa-solid fa-star" />
                <font-awesome-icon v-for="n in emptyStarCalc(item.vote_average)" :key="n" icon="fa-regular fa-star" />
            </p>
        </div>
    </li>
</template>

<style lang="scss" scoped>
.card {
    position: relative;
    margin: 15px;

    &:hover .card-body.overlay {
        opacity: 1;
        transition: opacity 400ms ease-in-out;
    }

    &:hover .card-head.overlay {
        opacity: 0;
        transition: opacity 400ms ease-in-out;
    }
}

.card-head {
    width: 342px;
    height: 513px;

    img {
        text-align: center;
        height: 100%;
    }
}

.card-body {
    position: absolute;
    top: 25px;
    left: 15px;
    opacity: 0;

    span:not(:first-child) {
        padding-left: 10px;
    }

    img {
        max-width: 22px;
    }
}

.card-body-flex {
    display: flex;
    align-items: center;
    gap: 5px;
}
</style>