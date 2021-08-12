<template>
  <div>
    <h1>This is Index page</h1>
    <div class="treeview js-treeview">
      <Tree :dataTree="trees" @edit_node = "showModal"/>
    </div>
    <div v-if="flag">
      <Modal :dataModal="modalData" :modalOpen="flag" @update_flag="toggleFlag"/>
    </div>
  </div>
</template>

<script>
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
