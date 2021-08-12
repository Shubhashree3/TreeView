import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import Vuex from 'vuex'
import axios from 'axios'
import List from './List'
import Button1 from './Button'
import Tree from './Tree'
import Modal from './Modal'
import Index from './Index'
import store from '/home/shubhashree/storybook/TreeView/.storybook/store'
// import store from '@/storybook/store'



storiesOf('List', module)
  .add('As a component', () => ({
    title: 'Components/Button',
    components: { List },
    template: '<Button primary label="Button"/>'
  }))
  .add('I don\'t work', () => '<List />')

storiesOf('Index', module)
  .add('Index vue', () => ({
    components:{Index},
    subcomponents: { Tree,Modal },
    store:store,
    template:`<Index />`}))

storiesOf('Tree', module)
  .add('Tree vue', () => ({
    components:{Tree},
    template:
    ` <ul>
        <li v-for='tree in trees'>{{ tree.id }}</li>
      </ul>
      `,
      store:store,
    data(){
      return {}
    },
    computed: {
    trees() {
      console.log(this.$store.state.trees)
      return this.$store.state.trees;

    }}
}))

storiesOf('Modal', module)
  .add('Modal vue', () => ({
    components:{Modal},
    template:`<Modal />`}))

  
