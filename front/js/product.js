const idProduct = new URL(window.location.href).searchParams.get("id");
console.log(idProduct)

const productObject = {
    color: '',
    id: '',
    name: '',
    imgUrl: '',
    price: '',
    qty: 1
}


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


function makePullDown(arr) {
    const pullDown = document.getElementById('colors');
    pullDown.addEventListener('change', colors);
    //needs to loop through color options but not sure how to get the color value
  }

