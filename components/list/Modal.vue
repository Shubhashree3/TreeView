<template>
  <div>
    <h1>This is modal page</h1>
    <b-modal
      ref="modal-ref"
      title="Edit Tree Node"
      hide-footer
      header-bg-variant="primary"
      header-text-variant="light"
      id="my-modal"
      class="testModal"
      v-model="model"
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
          id="testSubmitButton"
           >
          Submit
        </b-button>
        <b-button
          id="testCancelButton"
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
  props: ['modalOpen', 'dataModal'],
  created() {
    // return this.openTreeModal;
  },
  data() {
    return {
      tree: {
        id: '',
        label: '',
        parentId: '',
      },
    };
  },
  computed: {
    model: {
      get() { return this.modalOpen; },
      set(value) { this.$emit('update_flag', value); },
    },
    openTreeModal: {
      get() { return this.openModal(this.dataModal); },
      set() { },
    },
  },
  methods: {
    openModal() {
      Object.assign(this.tree, this.dataModal);
      delete this.tree.childrens;
      this.$bvModal.show('my-modal');
    },
    hideModal() {
      this.$bvModal.hide('my-modal');
      this.model = 0;
    },
    submitModal() {
      this.$store.dispatch('editNode', this.tree).then().catch();
      this.$bvModal.hide('my-modal');
      this.model = 0;
    },
  },
};
</script>
