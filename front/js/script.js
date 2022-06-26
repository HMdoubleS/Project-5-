// fetching data on the products from the server
fetch('http://localhost:3000/api/products/')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data); // console log to see the data that is returned 
    makeCards(data); // calling the makeCards function
  })
  .catch(error => {
    console.log(error);
  }) 

// taking the data array returned from the fetch call and dynamically creating product cards for the homepage
function makeCards(productsArray) {
  const length = productsArray.length;
  const items = document.getElementById('items');

  // iterating through each item in the array of data from the api and using a template literal to create/add the information 
  for (let i=0; i<length; i++) {
    let template = `
    <a href="./product.html?id=${productsArray[i]._id}">
    <article>
    <img src="${productsArray[i].imageUrl}" alt="${productsArray[i].altTxt}">
    <h3 class="productName">${productsArray[i].name}</h3>
    <p class="productDescription">${productsArray[i].description}</p>
  </article>
  </a> 
` 
    console.log(productsArray[i]);
    items.insertAdjacentHTML('beforeend',template) 
    // parses the text as html and inserts it at the specified position, beforeend means just inside the element before the last child 
  }
}
  
