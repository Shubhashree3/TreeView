# tree_view

## Build Setup

```bash
# install dependencies
$ npm install

# Get a full fake REST API at localhost:3000
$ npm run json:server

# serve with hot reload 
$ npm run dev
```
## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

Here main.css is used as default css for all components.
Screenshots directory contains all screenshots of the code.

### `components`

The components directory contains your Tree.vue component. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

Here Tree.vue is recursive component.

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

Here index.vue is default file which will be loaded first.

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

- actions.js Action handlers receive a context object which exposes the same set of methods/properties on the store instance.
- mutations.js The only way to actually change state in a Vuex store is by committing a mutation.
- state.js Vuex uses a single state tree - that is, this single object contains all your application level state and serves as the "single source of truth." 


![Alt text](./assets/screenshots/TreeComponent.png?raw=true "Title")
![Alt text](./assets/screenshots/IndexPage.png?raw=true "Title")
![Alt text](./assets/screenshots/Actions.png?raw=true "Title")
![Alt text](./assets/screenshots/FetchTree.png?raw=true "Title")