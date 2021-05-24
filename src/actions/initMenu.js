const menuList = [
  {
    _id: "60a7efe935ac18430fcf6404",
    name: "Starters",
    description: "Prepare your tummy for happy meal",
    menuContents: [
      {
        _id: "60a7efe9c1890279587dcbcd",
        parentId: "60a7efe935ac18430fcf6404",
        name: "Bread",
        price: "$16.88",
        ingredients: ["Flour", "Salt"],
        quantity: 350,
        measurment: "gr",
      },
      {
        _id: "60a7efe96597878269d3c3bb",
        parentId: "60a7efe935ac18430fcf6404",
        name: "Tapas",
        price: "$23.76",
        ingredients: ["Flour", "Salt"],
        quantity: 310,
        measurment: "ml",
      },
    ],
  },
  {
    _id: "60a7efe96358b0e6b7d6ea14",
    name: "Soups",
    description: "Enjoy fancy ingredients in water",
    menuContents: [
      {
        _id: "60a7efe95660183bed93150d",
        parentId: "60a7efe96358b0e6b7d6ea14",
        name: "Tomato Soup",
        price: "$41.10",
        ingredients: ["Tomato", "Water"],
        quantity: 300,
        measurment: "ml",
      },
      {
        _id: "60a7efe9ae2892e82e2f0fdf",
        parentId: "60a7efe96358b0e6b7d6ea14",
        name: "Creamy Broccoli",
        price: "$1.62",
        ingredients: ["Broccoli", "Water"],
        quantity: 322,
        measurment: "ml",
      },
    ],
  },
];

export default menuList;
