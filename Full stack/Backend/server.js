// const product = require('https://dummyjson.com/products');

// console.log(product[0].id)

fetch('https://dummyjson.com/products')
  .then(response => response.json())
  .then(data => {
    console.log(data.products[0].id);
    console.log(data.products[1]);
  })
  .catch(error => {
    console.log(error);
  });

