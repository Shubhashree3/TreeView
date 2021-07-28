<template>
  <div>
    <div class="treeview js-treeview">
    <Tree :dataTree="trees" @edit-node = "showModal"/>
    </div>
    <div v-if="flag===1">
      <Modal  :dataModal="modalData" @open-modal="openModal"/>
    </div>
  </div>
</template>

<script>
import Tree from '@/components/Tree.vue';
export default {
  components:{Tree,},
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
