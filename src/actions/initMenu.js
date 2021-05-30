const menuList = [
  {
    id: "menu-starters",
    name: "Starters",
    description: "Prepare your tummy for happy meal",
    menuContents: [
      {
        id: "component-bread",
        parentId: "menu-starters",
        name: "Bread",
        price: 16.88,
        ingredients: ["Flour", "Salt"],
        quantity: 350,
        measurment: "gr",
      },
      {
        id: "component-tapas",
        parentId: "menu-starters",
        name: "Tapas",
        price: 23.76,
        ingredients: ["Flour", "Salt"],
        quantity: 310,
        measurment: "ml",
      },
    ],
  },
  {
    id: "menu-soups",
    name: "Soups",
    description: "Enjoy fancy ingredients in water",
    menuContents: [
      {
        id: "component-tomato-soup",
        parentId: "menu-soups",
        name: "Tomato Soup",
        price: 41.1,
        ingredients: ["Tomato", "Water"],
        quantity: 300,
        measurment: "ml",
      },
      {
        id: "component-creamy-broccoli",
        parentId: "menu-soups",
        name: "Creamy Broccoli",
        price: 1.62,
        ingredients: ["Broccoli", "Water"],
        quantity: 322,
        measurment: "ml",
      },
    ],
  },
];

export default menuList;
