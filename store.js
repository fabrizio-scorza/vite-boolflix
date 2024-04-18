// import da vue dell'elemento reactive
import { reactive } from 'vue';

// export dello store 
export const store = reactive({
    moviesDb: [],
    seriesDb: [],
    apiKey: '7d0a43d485e86b97c1bff5bec83fa48b',
    language: 'it-IT',
    page: 1,
})