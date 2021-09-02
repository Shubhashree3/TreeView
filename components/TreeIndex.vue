<template>
  <div>
    <div class="treeview js-treeview" :class="btnClass">
      <Tree :dataTree="trees" @edit_node = "showModal"/>
    </div>
    <div>{{url}}</div>
    <div v-if="flag">
      <Modal :dataModal="modalData" :modalOpen="flag" @update_flag="toggleFlag"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    url: {
      type: String,
      default: 'Button'
    }
  },
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
    btnClass () {
      const classes = []
      if (this.type === 'primary') {
        classes.push('bg-blue-500 hover:bg-blue-700')
      } else if (this.type === 'secondary') {
        classes.push('bg-gray-500 hover:bg-gray-700')
      }
      else if (this.type === 'red') {
        classes.push('bg-red-700 hover:bg-red-700')
      }
      return classes.join(' ')
    }  
  },
  methods: {
    showModal(node) {
      this.flag = true;
      this.modalData = node;
    },
    toggleFlag() {
      this.flag = false;
    },
  }
};
</script>
