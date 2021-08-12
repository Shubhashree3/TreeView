import { action } from '@storybook/addon-actions'
import { configure } from '@storybook/vue';
import List from '../components/list/List.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import Tree from '../components/Tree.vue'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(BootstrapVue)
Vue.component('List', List)
Vue.component('Tree', Tree)
Vue.use(Vuex)

function loadStories() {
  const req = require.context('../components', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);