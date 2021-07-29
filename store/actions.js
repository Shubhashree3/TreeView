export default {
  addNode(store, newNode) {
    this.$axios.$post('trees', newNode)
      .then(() => { store.dispatch('fetchTree'); })
      .catch((error) => error);
  },
  editNode(store, newNode) {
    this.$axios.$put(`trees/${newNode.id}`, newNode)
      .then(() => { store.dispatch('fetchTree'); })
      .catch((error) => error);;
  },
  deleteNode(store, id) {
    this.$axios.$delete(`trees/${id}`)
      .then(() => {
        this.$axios.$get('trees')
          .then((trees) => {
            trees.forEach((tree) => {
              if (tree.parentId === id) {
                store.dispatch('deleteNode', tree.id);
              } else {
                store.dispatch('fetchTree');
              }
            });
          });
      }).catch((error) => error);
  },
  fetchTree(store) {
    this.$axios.$get('trees')
      .then((data) => {
        const parents = data.filter((value) => value.parentId === 0 || value.parentId === null);
        const childrens = data.filter((value) => value.parentId !== 'undefined' && value.parentId != null);
        const translator = (parentArray, childrenArray) => {
          parentArray.forEach((parent) => {
            childrenArray.forEach((current, index) => {
              if (current.parentId === parent.id) {
                const temp = JSON.parse(JSON.stringify(childrenArray));
                temp.splice(index, 1);
                translator([current], temp);
                if (typeof parent.childrens !== 'undefined') {
                  parent.childrens.push(current);
                } else {
                  parent.childrens = [current];
                }
              }
            });
          });
        };
        translator(parents, childrens);
        store.commit('setTrees', parents);
      }).catch((error) => error);
  },
};
