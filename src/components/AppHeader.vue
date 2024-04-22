<script>
import { store } from '../../store';

export default {
    data() {
        return {
            store,
            isVisibleMovies: 'false',
            isVisibleSeries: 'false'
        }
    },
    mounted() {
        store.callGenresList()
    }
}
</script>

<template>
    <div class="container">
        <div class="flex navbar">
            <!--logo searchbar e bottone di ricerca -->
            <div class="flex logo">
                <font-awesome-icon :icon="['fas', 'film']" />
                <h1>boolflix</h1>
            </div>
            <nav>
                <ul class="menu">
                    <li>Film</li>
                    <li class="arrowButton" @click="isVisibleMovies = !isVisibleMovies">
                        <font-awesome-icon :icon="['fas', 'caret-down']" />
                    </li>
                    <li v-if="isVisibleMovies">
                        <ul class="select">
                            <li v-for="genre in store.moviesGenresList" :value="genre.id">
                                {{ genre.name }}
                            </li>
                        </ul>
                    </li>
                    <li>
                        Serie Tv
                    </li>
                    <li class="arrowButton" @click="isVisibleSeries = !isVisibleSeries">
                        <font-awesome-icon :icon="['fas', 'caret-down']" />
                    </li>
                    <li v-if="isVisibleSeries">
                        <ul class="select">
                            <li v-for="genre in store.seriesGenresList" :value="genre.id">
                                {{ genre.name }}
                            </li>
                        </ul>
                    </li>
                </ul>


            </nav>
            <div class="flex">
                <input type="text" class="searchbar" v-model.trim="store.stringToSearch" name="search">
                <button @click="store.fetchList()" class="btn">Cerca</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.logo {
    color: red;
    align-items: center;
    font-size: 32px;
    text-shadow: 4px 2px 10px gray;
}

.navbar {
    margin: 15px;
    justify-content: space-between;
    align-items: baseline;
}

.menu {
    position: relative;
    display: flex;
    gap: 16px;
    color: red;
}

.arrowButton {
    cursor: pointer;

}

.select {
    background-color: black;
    position: absolute;
    transform: translateY(5%);
    display: none;
}

.searchbar {
    width: 300px;
    font-size: 16px;
    line-height: 24px;
    padding-left: 8px;

    &:focus-visible {
        outline: none;
    }
}

.btn {
    width: 70px;
    height: 28px;
    background-color: red;
    border-radius: 15px;
    color: white;
    border: none;
    cursor: pointer;
}
</style>