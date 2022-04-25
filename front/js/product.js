const idProduct = new URL(window.location.href).searchParams.get("id");
console.log(idProduct)

//getting the item from the api
fetch('http://localhost:3000/api/products/' + idProduct)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    makeProductCard(data);
    })
    .catch(err => console.log(err));
  

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
makePullDown(obj.colors);
prodColors.addEventListener('change', colors);
const length = prodColors.length;



// pulldown card function
function makePullDown(arr) {
    const pulldown = document.createElement('select');
    for (let i=0; i < obj.colors.length; i++) {

    }
  }
}   


//how do I get the img, price, description onto the page and alter them with the id?
//need to link the cart button to the cart page
//how do I get the color values for each ID for the pulldown menu?