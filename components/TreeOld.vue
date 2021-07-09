<template>
  <div class="treeview">
    <ul>
      <li v-for="node in dataTree">
      <div class="treeview__level" data-level="A">
          <span class="level-title">
            {{node.label}}
          </span>
          <b-button variant="outline-danger" @click="deleteNode(node.id)">
            <FontAwesomeIcon :icon="['fas', 'trash']" />
          </b-button>
          <b-button variant="outline-success"  @click="showModal(node)">
            <FontAwesomeIcon :icon="['fas', 'pencil-alt']" />
          </b-button>
          <div class="treeview__level-btns">
            <b-dropdown id="dropdown-dropright" dropright no-caret variant="outline-success" class="level-add">
              <template #button-content>
                  <FontAwesomeIcon :icon="['fas', 'plus']" />
              </template>
              <b-dropdown-item-button @click="addSame(node)">
                  Add Same Level
              </b-dropdown-item-button>
              <b-dropdown-item-button @click="addSub(node)">
                  Add Sub Level
              </b-dropdown-item-button>
            </b-dropdown>             
          </div>
        </div>
        <Tree :dataTree="node.childrens"/>
        <!-- <div v-for="childNode in node.childrens" style="padding: 25px;">
          
        </div> -->
      </li>
    </ul>
    <b-modal
      title="Edit Tree Node"
      ref="my-modal"
      hide-footer
      header-bg-variant="danger"
      header-text-variant="light"
      footer-bg-variant="danger">
      <form ref="form">
        <b-form-group
          label="Lable"
          label-for="label-input"
          >
          <b-form-input
            id="label-input"
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
           >
          Submit
        </b-button>
        <b-button
          id="toggle-btn"
          class=" mt-3 float-right"
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
    data(){
      return{
        tree:{
          "id":'',
          "label": "",
          "parentId":""
        }
      }
    },
    props:['dataTree'],
     
    methods:{
      addSame(node){
        var max_id=this.getMaxId();
        var newNode={}
        newNode.id=max_id+1
        newNode.parentId=node.parentId
        newNode.label='Item '+newNode.id+'.'+newNode.parentId
        this.$store.dispatch('addNode',newNode)
      },
      addSub(node){
        var max_id=this.getMaxId();
        var newNode={}
        newNode.id=max_id+1
        newNode.parentId=node.id
        newNode.label='Item '+newNode.id+'.'+newNode.parentId
        this.$store.dispatch('addNode',newNode)
      },
      deleteNode(id){
        alert(id)
        this.$store.dispatch('deleteNode',id)
      },
      getMaxId(){
        let max = 0;
        this.$store.state.rawTrees.forEach(node => {
          if (node.id > max) {
            max = node.id;
          }
        });
        return max;
      },
      showModal(node) {
        Object.assign(this.tree, node);
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
      submitModal() {
        this.$store.dispatch('editNode',this.tree)
        this.$refs['my-modal'].hide()
      }
    }
  }
</script>
<style type="text/css">
.treeview .btn-default {
  border-color: #e3e5ef;
}

.treeview .btn-default:hover {
  background-color: #f7faea;
  color: #bada55;
}

.treeview ul {
  list-style: none;
  padding-left: 32px;
}

.treeview ul li {
  padding: 50 0 0 35;
  position: relative;
}

.treeview ul li::before {
  content: "";
  position: absolute;
  top: -26px;
  left: -31px;
  border-left: 2px dashed #a2a5b5;
  width: 1px;
  height: 100%;
}

.treeview ul li::after {
  content: "";
  position: absolute;
  border-top: 2px dashed #a2a5b5;
  top: 70px;
  left: -30px;
  width: 65px;
}

.treeview > ul > li::before {
  top: 90px;
  left: 36px;
}

.treeview--mapview ul li::before {
  content: unset;
}

.treeview ul li:last-child::before {
  top: -22px;
  height: 90px;
}

.treeview > ul > li::after,
.treeview > ul > li:last-child::before {
  content: unset;
}

.treeview > ul > li:not(:last-child) > ul > li::before {
  content: unset;
}

.treeview__level::before {
  content: attr(data-level);
  position: absolute;
  left: -27.5px;
  top: -6.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 55px;
  width: 55px;
  border-radius: 50%;
  border: 7.5px solid #eef6d5;
  background-color: #bada55;
  color: #fff;
  font-size: 20px;
}

.treeview > ul > li > .treeview__level::before {
  height: 60px;
  width: 60px;
  top: -9.5px;
  background-color: #54a6d9;
  border: 7.5px solid #d5e9f6;
  font-size: 22px;
}

.treeview--mapview ul {
  justify-content: center;
  display: flex;
}

.treeview > ul > li > ul {
  padding-left: 34px;
}

.treeview__level {
  padding: 7px;
  padding-left: 42.5px;
  display: inline-block;
  border-radius: 5px;
  font-weight: 700;
  border: 1px solid #e3e5ef;
  position: relative;
  z-index: 1;
}

.treeview__level-btns {
  margin-left: 15px;
  display: inline-block;
  position: relative;
}

.treeview__level .level-same,
.treeview__level .level-sub {
  position: absolute;
  display: none;
  transition: opacity 250ms cubic-bezier(0.7, 0, 0.3, 1);
}

.treeview__level .level-same.in,
.treeview__level .level-sub.in {
  display: block;
}

.treeview__level .level-same.in .btn-default,
.treeview__level .level-sub.in .btn-default {
  background-color: #faeaea;
  color: #da5555;
}

.treeview__level .level-same {
  top: 0;
  left: 45px;
}

.treeview__level .level-sub {
  top: 42px;
}

.treeview__level .level-remove {
  display: none;
}

.treeview__level.selected {
  background-color: #f9f9fb;
  box-shadow: 0 3 15 0 rgba(0, 0, 0, 0.1);
}

.treeview__level.selected .level-remove {
  display: inline-block;
}

.treeview__level.selected .level-add {
  display: none;
}

.treeview__level.selected .level-same,
.treeview__level.selected .level-sub {
  display: none;
}

.treeview .level-title {
  cursor: pointer;
  user-select: none;
}

.treeview .level-title:hover {
  text-decoration: underline;
}

.treeview--mapview ul li::after {
  content: unset;
}
</style>