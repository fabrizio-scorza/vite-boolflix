// import da vue dell'elemento reactive
import { reactive } from 'vue';
//import della libreria di axios e dello store
import axios from 'axios';

// export dello store 
export const store = reactive({
    moviesDb: [],
    seriesDb: [],
    moviesGenresList: [],
    seriesGenresList: [],
    stringToSearch: '',
    emptyString: false,
    apiKey: '7d0a43d485e86b97c1bff5bec83fa48b',
    language: 'it-IT',
    page: 1,
    flags: {
        it: '/it.png',
        en: '/en.png',
        ja: '/ja.png'
    },

    // metodo che chiama tramite axios le due api e assegna a due array i dati ricevuti
    fetchList() {
        //prima chiamata api film inseiti nell'array film
        if (this.stringToSearch !== '') {
            this.callThis('https://api.themoviedb.org/3/search/movie').then(res => {
                const data = res.data.results;
                this.moviesDb = data;
            });

            //seconda chiamata api serie tv inserite nell'array serie
            this.callThis('https://api.themoviedb.org/3/search/tv').then(res => {
                const data = res.data.results;
                this.seriesDb = data;
            });
        } else {
            this.moviesDb = [];
            this.seriesDb = [];
            this.emptyString = true;
        }
    },
    callThis(link) {
        // metodo generico per chiamare l'api tramite axiox
        const promise = axios.get(link,
            {
                params: {
                    api_key: this.apiKey,
                    query: this.stringToSearch,
                    language: this.language,
                    page: this.page
                }
            })
        return promise;
    },
    callGenresList() {
        const callingLang = this.language.slice(0, 2);
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=${callingLang}`).then(res => {
            const data = res.data.genres;
            this.moviesGenresList = data;
        })
        axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${this.apiKey}&language=${callingLang}`).then(res => {
            const data = res.data.genres;
            this.seriesGenresList = data;
        })
    }
})