import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
import data from '/db.json'



import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus as fasPlus } from '@fortawesome/free-solid-svg-icons';
Vue.use(Vuex);
library.add(fasPlus);

const store = new Vuex.Store({
    state: require("../store/state.js").state,
    actions: require("../store/actions.js").actions,
    mutations: require("../store/mutations.js").mutations,
});

console.log("store",store)
store.state.trees=data.trees;
console.log("tree in store",store.state.trees)

store.$axios = axios
export default store