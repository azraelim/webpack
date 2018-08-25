import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);
//console.log(process.env.NODE_ENV)
//const debug = process.env.NODE_ENV !== 'production';

const modules = {};

let store = new Vuex.Store({
    state: {
        userName:"",
    },
    getters: {
        getUserName(state){
            return state.username;
        },
    },
    mutations: {

        SET_userName(state, value){
            state.userName = value;
        },

    },
    actions: {

    },
    modules,
    //plugins: debug ? [require('vuex/dist/logger')()] : [],
    //strict: debug
});

export default store;
