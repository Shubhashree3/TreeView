
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

## Getting Started

### `Recursive Components`

A recursive component in Nuxt.js is one which invokes itself.

Recursive components are useful for displaying comments on a blog, nested menus, or basically anything where the parent and child are the same, albeit with different content.

![Alt text](./assets/screenshots/TreeComponent.png?raw=true "Title")

Here in line no.18 we call <Tree> component again in <Tree> component recursive call.
  
 ### `Data Structure`
  
  db.json file contains demo data for fake API as below:
  
  ```sh
{
  "trees": [
    {
      "id": 1,
      "parentId": 0,
      "label": "Root 1"
    },
    {
      "id": 2,
      "parentId": 1,
      "label": "Item 2.1"
    },
    {
      "id": 3,
      "parentId": 2,
      "label": "Item 3.2"
    },
    {
      "id": 4,
      "parentId": 3,
      "label": "Item 4.3"
    }
  }
```

```bash
#run this command to start fake API server
# By default the server will serve db.json file located on the root of project
npm run json:server

#To serve a custom json file, place the file in root of the project
npm run json-server --watch <File Name>
```
  Now if you go to http://localhost:3000/trees/1, you'll get
  
  ```sh
  {
    "id": 1,
    "parentId": 0,
    "label": "Root 1"
  }
  ```
  #### `Routes`
  ```sh
  GET    /trees ==> For getting all data
  GET    /trees/1 ==> For getting data with id 1
  POST   /trees ==> For adding new data
  PUT    /trees/1 ==> For Editing data by id
  DELETE /trees/1 ==> For deleting specific data by id
  ```
 ### `Data Conversion`
 
  ![Fetch data screenshot](./assets/screenshots/FetchTree.png?raw=true "Title")
  
  Here we are getting the data from the json-server in the following format.
  
  ```sh
    {
      "trees": [
        {
          "id": 1,
          "parentId": 0,
          "label": "Root 1"
        },
        {
          "id": 2,
          "parentId": 1,
          "label": "Item 2.1"
        },
        {
          "id": 3,
          "parentId": 2,
          "label": "Item 3.2"
        },
        {
          "id": 4,
          "parentId": 3,
          "label": "Item 4.3"
        }
      ] 
     }
```
  
  The data here is a single level array of nodes. Every node has a individual unique id and a parentId attribute.
  
  Based on this parentId attribute and the unique id of each node we have to convert the data in a tree form where the node will be shifted to the children attribute of the parent node.
  
  And finally the above displayed raw data will be converted to the format displayed below.
  
  ```sh
    {
    "id": 1,
    "parentId": 0,
    "label": "Root 1",
    "children": [
      {
        "id": 2,
        "parentId": 1,
        "label": "Item 2.1",
        "children": [
          {
            "id": 3,
            "parentId": 2,
            "label": "Item 3.2",
            "children": [
              {
                "id": 4,
                "parentId": 3,
                "label": "Item 4.3"
              }
            ]
          }
        ]
      }
    ]
  }
```
![Alt text](./assets/screenshots/IndexPage.png?raw=true "Title")
![Alt text](./assets/screenshots/Actions.png?raw=true "Title")
