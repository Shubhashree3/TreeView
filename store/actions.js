export default {
  addNode(store,newNode){
    this.$axios.$post('trees',newNode)
    .then(()=>{store.dispatch('fetchTree')})
    .catch(()=>{alert(error)})
  },
  editNode(store,newNode){
    this.$axios.$put(`trees/${newNode.id}`,newNode)
    .then(()=>{store.dispatch('fetchTree')})

  },
  deleteNode(store, id) {
    this.$axios.$delete(`trees/${id}`)
      .then(() => {
        this.$axios.$get('trees')
          .then((trees)=>{
            trees.forEach((tree)=>{
              if (tree.parentId===id){
                store.dispatch('deleteNode',tree.id)
              }
              else{
                store.dispatch('fetchTree');
              }
            })
        });
    })
  },
  fetchTree(store) {
    this.$axios.$get('trees')
    .then((data)=>{
      // store.commit('setRawTrees', data);
      let parents = data.filter(value => value.parentId == 0 || value.parentId == null)
      let childrens = data.filter(value => value.parentId !== 'undefined' && value.parentId != null)
      let translator = (parents, childrens) => {
        parents.forEach((parent) => {
          childrens.forEach((current, index) => {
            if (current.parentId === parent.id) {
              let temp = JSON.parse(JSON.stringify(childrens))
              temp.splice(index, 1)
              translator([current], temp)
              typeof parent.childrens !== 'undefined' ? parent.childrens.push(current) : parent.childrens = [current]
            }
          })
        })
      }
      translator(parents, childrens)
      store.commit('setTrees', parents);
    })
  }  
};