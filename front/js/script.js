fetch('http://localhost:3000/api/products')
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    makeCards(data);
  })
  .catch(err => {
    console.log(err);
  }) 



function makeCards(productsArray) {
  const length = productsArray.length;
  const items = document.getElementById('items');

  for (let i=0; i<length; i++) {
    let template = `
    <a href="./product.html?id=${productsArray[i]._id}">
    <article>
    <img src=".../product01.jpg"  alt="${productsArray[i].altTxt}">
    <h3 class="productName">${productsArray[i].name}</h3>
    <p class="productDescription">${productsArray[i].description}</p>
  </article>
  </a> 
` 
    console.log(productsArray[i]);
    items.insertAdjacentHTML('beforeend',template)
  }
}
  
