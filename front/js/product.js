const idProduct = new URL(window.location.href).searchParams.get("id");
console.log(idProduct)

const items = document.getElementById('items');

// updating quantity
const quantity = document.getElementById('quantity');
quantity.addEventListener('change', quantity);

// add to cart
const addBtn = document.getElementById('addToCart');
addToCart.addEventListener('click', addToCart);