<template>
  <div>
    <div class="treeview js-treeview">
    <Tree :dataTree="trees" @edit-node = "showModal"/>
    </div>
    <!-- <div>{{ flag }}</div> -->
    
    <!-- <b-modal 
      ref="modal-ref"
      title="Edit Tree Node"
      hide-footer
      header-bg-variant="primary"
      header-text-variant="light"
      id="my-modal"
      >
      <form ref="form">
        <b-form-group
          label="New Lable"
          label-for="label-input"
          >
          <b-form-input
            id="label-input"
            bv-model="tree.label"
            v-model="tree.label"
            required>
          </b-form-input>
        </b-form-group>
      </form>
      <div>
        <b-button
          class=" ml-2 mt-3 float-right"
          variant="outline-primary"
          @click="submitModal"
          id="submitButton"
           >
          Submit
        </b-button>
        <b-button
          id="toggle-btn"
          class=" mt-3 float-right cancelButton"
          variant="outline-danger"
          @click="hideModal"
           >
          Cancel
        </b-button>
      </div>
    </b-modal> -->
  </div>
</template>

<script>
import Tree from '@/components/Tree.vue';
export default {
  components:{Tree,},
  name:'Modal',
  data() {
    return {
      tree: {
        id: '',
        label: '',
        parentId: '',
      },
    };
  },
  created() {
    this.$store.dispatch('fetchTree');
  },
  computed: {
    trees() {
      console.log(typeof(this.$store.state.trees))
      return this.$store.state.trees;
    },
  },
  methods: {
    showModal(node) {
      // this.flag=1
      // alert(this.flag)
      // this.$emit('modal', node);
    },
    
  },
};
</script>
