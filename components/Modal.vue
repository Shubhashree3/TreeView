<template>
  <div>
    <div>
    {{node.id}}
  </div>
	<b-modal
    ref="modal-ref"
    title="Edit Tree Node"
    hide-footer
    header-bg-variant="primary"
    header-text-variant="light"
    id="my-modal"
    v-model="modalOpen"
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
  </b-modal>
</div>
</template>
<script>
export default {
  created(){
    console.log(this.modalData)
    this.openModal(this.modalData)
  },
	data() {
    return {
      node:{},
      tree: {
        id: '',
        label: '',
        parentId: '',
      },
    };
  },
  props: ['modalOpen','modalData'],
  methods: {
    openModal(node) {
      console.log('hi')
      Object.assign(this.tree, node);
      delete this.tree.childrens;
      this.$bvModal.show('my-modal');
    },
    hideModal() {
      this.$bvModal.hide('my-modal');
    },
    submitModal() {
      this.$store.dispatch('editNode', this.tree);
      this.$bvModal.hide('my-modal');
    },
   },
}
</script>