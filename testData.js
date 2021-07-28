module.exports = {
  "demoData": 
  [
    {
      "id": 1,
      "parentId": 0,
      "label": "Root 1",
      "childrens": [
        {
          "id": 2,
          "parentId": 1,
          "label": "Item 2.1",
          "childrens": [
            {
              "id": 3,
              "parentId": 2,
              "label": "Item 3.2",
              "childrens": [
                {
                  "id": 4,
                  "parentId": 3,
                  "label": "Item 4.3",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      "id": 5,
      "label": "Root 24",
      "parentId": 0,
    }
  ],
  "data": 
    [
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
      },
      {
        "id": 5,
        "label": "Root 24",
        "parentId": 0
      }
    ],
  "flag":true,
  "dataModal":{
      "id": 5,
      "label": "Root 24",
      "parentId": 0,    
  }
}
