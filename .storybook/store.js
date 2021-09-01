import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
import data from '/db.json'
import store_actions from '/store/actions.js'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus as fasPlus } from '@fortawesome/free-solid-svg-icons';
import { action } from '@storybook/addon-actions';
Vue.use(Vuex);
library.add(fasPlus);

const store = new Vuex.Store({
   state: 
        require("../store/state.js"),
   actions: {
     fetchTree(store) {
       action("fetchTree");
     },
     addNode(newNode){
        action("addNode")(newNode);
     },
     editNode(newNode){
        action("editNode")(newNode);
     },
     deleteNode(id){
        action("deleteNode")(id);
     }
   },
   mutations: require("../store/mutations.js").mutations
 });
// const store = new Vuex.Store({
//     state: require("../store/state.js").state,
//     actions: require("../store/actions.js").actions,
//     mutations: require("../store/mutations.js").mutations,
// });
console.log("this.action",store_actions.fetchTree)
// console.log("action",store.mutations)
store.state.trees=data.trees;
store.actions=store_actions.fetchTree
console.log("fetchTree",store.actions)

store.$axios = axios
export default store