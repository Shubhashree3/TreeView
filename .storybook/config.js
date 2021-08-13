import { action } from '@storybook/addon-actions'
import { configure } from '@storybook/vue';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import List from '../components/list/List.vue'
import Tree from '../components/Tree.vue'
import Vue from 'vue'
import Vuex from 'vuex'


import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import jquery from 'jquery';
global.$ = jquery;
global.jQuery = jquery;


library.add(faPlus);
library.add(faPencilAlt);
library.add(faTrash);

// Vue.config.productionTip = false
Vue.component('FontAwesomeIcon', FontAwesomeIcon);

Vue.use(BootstrapVue)
Vue.component('List', List)
Vue.component('Tree', Tree)
Vue.use(Vuex)

function loadStories() {
  const req = require.context('../components', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);