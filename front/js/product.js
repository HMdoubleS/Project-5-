const idProduct = new URL(window.location.href).searchParams.get("id");
console.log(idProduct)

//getting the item from the api
fetch('http://localhost:3000/api/products/' + idProduct)
    .then(res => res.json())
    .then(data => {
    makeProductCard(data);
    })
    .catch(err => console.log(err));
  

function makeProductCard(obj) {
    
// updating quantity
const quantity = document.getElementById('quantity');
quantity.addEventListener('change', quantity);

// add to cart
const addBtn = document.getElementById('addToCart');
addToCart.addEventListener('click', addToCart);

// color change pulldown
makePullDown(obj.colors);
}

// pulldown card function
function makePullDown(array) {
    const pullDown = document.getElementById('colors');
    pullDown.addEventListener('change', colors);
    //needs to loop through color options but not sure how to get the color value
  }


let productImg = document.getElementById('imageUrl'); 
let productName = document.getElementById('name');
let productPrice = document.getElementById('price');
let productDescription = document.getElementById('description');



//how do I get the img, price, description onto the page and alter them with the id?
//need to link the cart button to the cart page
//how do I get the color values for each ID for the pulldown menu?