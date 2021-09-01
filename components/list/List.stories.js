import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import Vuex from 'vuex'
import  {axios} from 'axios'
import Tree from './Tree'
import Modal from './Modal'
import Index from './Index'

import store from '/home/shubhashree/storybook/TreeView/.storybook/store'
// import store from '@/storybook/store'


storiesOf('Index', module)
  .add('Index vue', () => ({
    components:{Index},
    title:'Index',
    subcomponents: { Tree,Modal },
    store:store,
    argTypes: {
      variant: {
        control: { type: 'radio' }
    }
  },
    template:`
   <Index/>`,
  }))

storiesOf('Tree', module)
  .add('Tree vue', () => ({
    components:{Tree},
    store:store,
    template:
    ` <Tree/>`
}))

storiesOf('Modal', module)
  .add('Modal vue', () => ({
    components:{Modal},
    template:`<Modal />`}))

  
