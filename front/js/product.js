const idProduct = new URL(window.location.href).searchParams.get("id");
console.log(idProduct)

//getting the item from the api
fetch('http://localhost:3000/api/products/' + idProduct)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    makeProductCard(data);
    })
    .catch(error => console.log(error));
  

function makeProductCard(obj) {
// variables for DOM elements
const prodImg = document.querySelector('.item__img');
const prodDescription = document.getElementById('description'); 
const prodPrice = document.getElementById('price');
const prodTitle = document.getElementById('title');
const prodQuantity = document.getElementById('quantity');
const addBtn = document.getElementById('addToCart');
const prodColors = document.getElementById('colors');

// add content to elements

//image
const itemImg = document.createElement('img');
itemImg.setAttribute('src', obj.imageUrl);
itemImg.setAttribute('alt', obj.altTxt);
prodImg.appendChild(itemImg);

//price, title and description
prodPrice.innerHTML = obj.price;
prodTitle.innerHTML = obj.name;
prodDescription.innerHTML = obj.description;

// updating quantity event
quantity.addEventListener('change', quantity);

// add to cart event
addBtn.addEventListener('click', addToCart);

// color change pulldown
    for (let i=0; i < obj.colors.length; i++) {
        const pulldown = document.createElement('option');
        pulldown.setAttribute('value', obj.colors[i]);
        pulldown.value = obj.colors[i];
        pulldown.innerHTML = obj.colors[i]; 
        prodColors.appendChild(pulldown);
        pulldown.addEventListener('change', obj.colors);
    }
}   

//need to link the cart button to the cart page
