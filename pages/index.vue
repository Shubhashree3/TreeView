<template>
  <div>
    <div class="treeview js-treeview">
    <Tree :dataTree="trees" @edit-node = "showModal"/>
    </div>
    <div> {{flag}}</div>
    <div v-if="flag==1">
      <div>{{flag}}{{modalData}}</div>
      <Modal modalOpne="flag" :modalData="modalData" @edit-node="showModal"/>
    </div>
  </div>
</template>

<script>
import Tree from '@/components/Tree.vue';
import Modal from '@/components/Modal.vue';
export default {
  components:{Tree,Modal,},
  name:'Modal',
  data() {
    return {
      flag:0,
      modalData:{},
      tree: {
        id: '',
        label: '',
        parentId: '',
      },
    };
  },
  props: ['dataModal'],
  created() {
    this.$store.dispatch('fetchTree');
  },
  computed: {
    trees() {
      return this.$store.state.trees;
    },
  },
  methods: {
    openModal(node) {
      console.log("openModal call thyu")
      if(this.flag===1){
        this.$emit('open-modal', node);
      }
    },
    showModal(node){
      console.log("ahi aavya")
      this.flag=1
      this.modalData=node
    }
    
  },
};
</script>
