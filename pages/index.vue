<template>
  <div>
    <div class="treeview js-treeview"> 
    <Tree :dataTree="trees"/>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('fetchTree');
  },
  computed: {
    trees() {
      return this.$store.state.trees;
    },
  },
}
</script>
