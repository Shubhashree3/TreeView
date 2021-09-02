import { wrapFunctional } from './utils'

export { default as Modal } from '../../components/Modal.vue'
export { default as MyButton } from '../../components/MyButton.vue'
export { default as Tree } from '../../components/Tree.vue'
export { default as TreeIndexStories } from '../../components/TreeIndex.stories.vue'
export { default as TreeIndex } from '../../components/TreeIndex.vue'

export const LazyModal = import('../../components/Modal.vue' /* webpackChunkName: "components/modal" */).then(c => wrapFunctional(c.default || c))
export const LazyMyButton = import('../../components/MyButton.vue' /* webpackChunkName: "components/my-button" */).then(c => wrapFunctional(c.default || c))
export const LazyTree = import('../../components/Tree.vue' /* webpackChunkName: "components/tree" */).then(c => wrapFunctional(c.default || c))
export const LazyTreeIndexStories = import('../../components/TreeIndex.stories.vue' /* webpackChunkName: "components/tree-index-stories" */).then(c => wrapFunctional(c.default || c))
export const LazyTreeIndex = import('../../components/TreeIndex.vue' /* webpackChunkName: "components/tree-index" */).then(c => wrapFunctional(c.default || c))
