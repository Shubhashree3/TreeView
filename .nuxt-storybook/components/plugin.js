import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  Modal: () => import('../../components/Modal.vue' /* webpackChunkName: "components/modal" */).then(c => wrapFunctional(c.default || c)),
  MyButton: () => import('../../components/MyButton.vue' /* webpackChunkName: "components/my-button" */).then(c => wrapFunctional(c.default || c)),
  Tree: () => import('../../components/Tree.vue' /* webpackChunkName: "components/tree" */).then(c => wrapFunctional(c.default || c)),
  TreeIndexStories: () => import('../../components/TreeIndex.stories.vue' /* webpackChunkName: "components/tree-index-stories" */).then(c => wrapFunctional(c.default || c)),
  TreeIndex: () => import('../../components/TreeIndex.vue' /* webpackChunkName: "components/tree-index" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
