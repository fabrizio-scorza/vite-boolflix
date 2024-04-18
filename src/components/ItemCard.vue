<script>
import axios from 'axios';
import { store } from '../../store';

export default {
    props: ['item'],
    data() {
        return {
            store,
            lang: ['en', 'it', 'ja'],
            cast: [],
            genres: []
        }
    },
    methods: {
        // metodo che calcola il voto da decimi a quinti
        starCalc(vote) {
            vote = Math.ceil(vote / 2);
            return vote;
        },
        // metodo che calcola in base al voto le stelle mancanti
        emptyStarCalc(vote) {
            vote = Math.ceil(vote / 2);
            const emptyVote = 5 - vote;
            return emptyVote;
        },
        //metodo che chiama l'api per il cast
        callCastApi(card) {
            this.cast = [];
            //se il titolo non è undefined allora è un film e chiama l'api del cast dei film
            if (card.title != undefined) {
                axios.get(`https://api.themoviedb.org/3/movie/${card.id}/credits?api_key=${store.apiKey}&language=${store.language}`).then(res => {
                    const data = res.data.cast;
                    if (data.length > 5) {
                        for (let i = 0; i < 5; i++) {
                            this.cast.push(data[i].name);
                        }
                    } else if (data.length > 0 && data.length <= 5) {
                        for (let i = 0; i < data.length; i++) {
                            this.cast.push(data[i].name);
                        }
                    } else {
                        this.cast.push('Informazioni sul cast assenti');
                    }
                })
            } else {
                //altrimenti è una serie tv e allora chiama l'api del cast delle serie tv
                axios.get(`https://api.themoviedb.org/3/tv/${card.id}/credits?api_key=${store.apiKey}&language=${store.language}`).then(res => {
                    const data = res.data.cast;
                    if (data.length > 5) {
                        for (let i = 0; i < 5; i++) {
                            this.cast.push(data[i].name);
                        }
                    } else if (data.length > 0 && data.length <= 5) {
                        for (let i = 0; i < data.length; i++) {
                            this.cast.push(data[i].name);
                        }
                    } else {
                        this.cast.push('Informazioni sul cast assenti');
                    }
                })
            }
        },
        //metodo che chiama la lista dei generi
        callGenre(card) {
            const callingLang = this.store.language.slice(0, 2);
            this.genres = [];

            if (card.title != undefined) {
                axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${store.apiKey}&language=${callingLang}`).then(res => {
                    const data = res.data.genres;

                    for (let i = 0; i < card.genre_ids.length; i++) {
                        let index = data.findIndex((element) => element.id == card.genre_ids[i])
                        this.genres.push(data[index].name)

                    }
                    if (this.genres.length == 0) {
                        this.genres.push('Non ci sono informazioni sul genere')
                    }
                })
            } else {
                axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${store.apiKey}&language=${callingLang}`).then(res => {
                    const data = res.data.genres;

                    for (let i = 0; i < card.genre_ids.length; i++) {
                        let index = data.findIndex((element) => element.id == card.genre_ids[i])
                        this.genres.push(data[index].name)
                    }
                })
            }
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
        <div class="card-body overlay">
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

            <p class="description">
                <!-- descrizione -->
                <span>Descrizione:</span>
                <span>{{ item.overview }}</span>
            </p>

            <div>
                <!-- bottone che chiama l'api e mostra i primi 5 attori del cast -->
                <button class="btn" @click="callCastApi(item)">Show cast</button>
                <ul class="list">
                    <li v-for="actor in cast">
                        {{ actor }}
                    </li>
                </ul>
            </div>

            <div>
                <!-- chiamata per i generi -->
                <button class="btn" @click="callGenre(item)">Show genres</button>
                <ul class="list">
                    <li v-for="genre in genres">
                        {{ genre }}
                    </li>
                </ul>
            </div>

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
    border: 1px solid red;

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
    width: 320px;

    &>*:not(:last-child) {
        padding-bottom: 15px;
    }

    span:not(:first-child) {
        padding-left: 10px;
    }

    img {
        max-width: 22px;
    }
}

.description {
    max-height: 200px;
    overflow: auto;
}

.btn {
    cursor: pointer;
    background-color: transparent;
    color: red;
    border: none;
    text-decoration: underline;
    font-size: 16px;
}

.list {
    display: flex;
    flex-wrap: wrap;

    &>* {
        &:not(:last-child) {
            padding-right: 8px;

            &::after {
                content: ','
            }
        }
    }
}

.card-body-flex {
    display: flex;
    align-items: center;
    gap: 5px;
}

.fa-star {
    color: goldenrod;
}
</style>