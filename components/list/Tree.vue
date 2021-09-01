<template>
  <div>
    <ul>
      <li :id="node.id" v-for="node in dataTree" :key="node.id" >
        <div class="treeview__level" data-level="A">
          <span class="level-title toggleSpan" @click="toggle(node.id)" :id="`toggleSpan-`+node.id">
            {{node.label}}
          </span>
          <div class="treeview__level-btns">
            <b-button
              variant="outline-danger"
              :class="['deleteButton', {'visible': isEditable(node), 'notVisible': isNormal(node)}]"
              :id="`deleteButton-`+node.id"
              @click="deleteNode(node.id)">
              <FontAwesomeIcon :icon="['fas', 'trash']" />
            </b-button>
            <b-button
              variant="outline-primary"
              :class="['editButton', {'visible': isEditable(node), 'notVisible': isNormal(node)}]"
              :id="`editButton-`+node.id"
              @click="showModal(node)">
              <FontAwesomeIcon :icon="['fas', 'pencil-alt']" />
            </b-button>
            <b-button
              :id="`dropdown-`+node.id"
              variant="outline-success"
              :class="['level-add', {'visible': isNormal(node), 'notVisible': isEditable(node)}]"
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
        <Tree :dataTree="node.childrens" @edit_node = "showModal"/>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  created() {
  },
  name: 'Tree',
  title:'Tree',
  data() {
    return {
      editables: [],
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
      newNode.id = new Date().valueOf();
      newNode.parentId = node.parentId;
      newNode.label = 'New Node';
      this.$store.dispatch('addNode', newNode);
    },
    addSub(node) {
      const newNode = {};
      newNode.id = new Date().valueOf();
      newNode.parentId = node.id;
      newNode.label = 'New Node';
      this.$store.dispatch('addNode', newNode);
    },
    deleteNode(id) {
      this.$store.dispatch('deleteNode', id);
    },
    showModal(node) {
      this.$emit('edit_node', node);
    },
    toggle(id) {
      const index = this.editables.indexOf(id);
      if (index === -1) {
        this.editables.push(id);
      } else {
        this.editables.splice(index, 1);
      }
    },
    isNormal(node) {
      return (this.editables.indexOf(node.id) === -1);
    },
    isEditable(node) {
      return !this.isNormal(node);
    },
    openMenu(id) {
      $(`#dropdown-${id}`).siblings().toggleClass('in');
    },
  },
};
</script>
<style type="text/css">
.visible {
  display: inherit;
}

.notVisible {
  display: none;
}
</style>
