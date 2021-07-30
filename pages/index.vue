<template>
  <div>
    <div class="treeview js-treeview">
      <Tree :dataTree="trees" @edit-node = "showModal"/>
    </div>
    <div v-if="flag==1">
      <Modal :dataModal="modalData" :modalOpen="flag" @update_flag="toggleFlag"/>
    </div>
  </div>
</template>

<script>
import Tree from '@/components/Tree.vue';
import Modal from '@/components/Modal.vue';

export default {
  created() {
    this.$store.dispatch('fetchTree');
  },
  data() {
    return {
      flag: false,
      modalData: {},
      tree: {
        id: '',
        label: '',
        parentId: '',
      },
    };
  },
  components: { Tree, Modal },
  computed: {
    trees() {
      return this.$store.state.trees;
    },
  },
  methods: {
    showModal(node) {
      this.flag = true;
      this.modalData = node;
    },
    toggleFlag() {
      this.flag = false;
    },
  },
};
</script>
