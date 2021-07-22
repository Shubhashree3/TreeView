<template>
  <div>
    <ul>
      <li :id="node.id" v-for="node in dataTree" :key="node.id">
        <div class="treeview__level" data-level="A">
          <span class="level-title" @click="toggle(node.id)">{{node.label}}</span>
          <div class="treeview__level-btns">
            <b-button
              variant="outline-danger"
              class="deleteButton"
              :id="`deleteButton-`+node.id"
              @click="deleteNode(node.id)">
              <FontAwesomeIcon :icon="['fas', 'trash']" />
            </b-button>
            <b-button
              variant="outline-primary"
              class="editButton"
              :id="`editButton-`+node.id"
              @click="showModal(node)">
              <FontAwesomeIcon :icon="['fas', 'pencil-alt']" />
            </b-button>
            <b-button
              :id="`dropdown-`+node.id"
              variant="outline-success"
              class="level-add"
              @click="openMenu(node.id)">
              <FontAwesomeIcon :icon="['fas', 'plus']" />
            </b-button>
          <b-button
            :id="`addSame-`+node.id"
            variant="light"
            @click="addSame(node)"
            class="level-same" >
            <span>Add Same Level</span>
          </b-button>
          <b-button
            variant="light"
            @click="addSub(node)"
            class="level-sub"
            :id="`addSub-`+node.id">
            <span>Add Sub Level</span>
          </b-button>
          </div>
        </div>
        <Tree :dataTree="node.childrens"/>
      </li>
    </ul>
    <b-modal
      title="Edit Tree Node"
      ref="my-modal"
      hide-footer
      header-bg-variant="primary"
      header-text-variant="light"
      >
      <form ref="form">
        <b-form-group
          label="New Lable"
          label-for="label-input"
          >
          <b-form-input
            id="label-input"
            v-model="tree.label"
            @keydown.native.enter="submitModal"
            required>
          </b-form-input>
        </b-form-group>
      </form>
      <div>
        <b-button
          class=" ml-2 mt-3 float-right submitButton"
          variant="outline-primary"
          @click="submitModal"
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
  data() {
    return {
      tree: {
        id: '',
        label: '',
        parentId: '',
      },
    };
  },
  props: ['dataTree'],
  methods: {
    addSame(node) {
      const newNode = {};
      newNode.id = new Date().valueOf()
      console.log(newNode.id)
      newNode.parentId = node.parentId;
      newNode.label = 'New Node';
      this.$store.dispatch('addNode', newNode);
    },
    addSub(node) {
      const newNode = {};
      newNode.id = new Date().valueOf()
      newNode.parentId = node.id;
      newNode.label = 'New Node' ;
      this.$store.dispatch('addNode', newNode);
    },
    deleteNode(id) {
      this.$store.dispatch('deleteNode', id);
    },
    showModal(node) {
      Object.assign(this.tree, node);
      delete this.tree.childrens;
      this.$refs['my-modal'].show();
    },
    hideModal() {
      this.$refs['my-modal'].hide();
    },
    submitModal() {
      this.$store.dispatch('editNode', this.tree);
      this.$refs['my-modal'].hide();
    },
    toggle(id) {
      const editButton = document.getElementById(`editButton-${id}`);
      const deleteButton = document.getElementById(`deleteButton-${id}`);
      const dropdownButton = document.getElementById(`dropdown-${id}`);
      if (editButton.style.display === 'none' || editButton.style.display === '') {
        editButton.style.display = 'inherit';
        deleteButton.style.display = 'inherit';
        dropdownButton.style.display = 'none';
      } else {
        editButton.style.display = 'none';
        deleteButton.style.display = 'none';
        dropdownButton.style.display = 'inherit';
      }
    },
    openMenu(id) {
      $(`#dropdown-${id}`).siblings().toggleClass('in');
    },
  },
};
</script>
