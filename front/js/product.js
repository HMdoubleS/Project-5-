const idProduct = new URL(window.location.href).searchParams.get("id");
console.log(idProduct);


//set up the cart - 3 places local storage, array, and JSON
let cartString = localStorage.getItem('cart') || '[]';
// if(localStorage.getItem('cart')) {
//     cartString = localStorage.getItem('cart')
// } else {
//     cartString = '[]'
// }
let cartArray = JSON.parse(cartString)

// object that represents the product
const prodObject = {
    _id: '',
    name: '',
    imgUrl: '',
    altTxt: '',
    color: '',
    quantity: 1
}

//getting the item from the api
fetch('http://localhost:3000/api/products/' + idProduct)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        makeProductCard(data);
        initProdObject(data);
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
    quantity.addEventListener('change', updateQuantity);


    // color change pulldown
    for (let i=0; i < obj.colors.length; i++) {
        const pulldown = document.createElement('option');
        pulldown.setAttribute('value', obj.colors[i]);
        pulldown.value = obj.colors[i];
        pulldown.innerHTML = obj.colors[i]; 
        prodColors.appendChild(pulldown);
        pulldown.addEventListener('change', updateColor);
    }
}    
// update quantity function
function updateQuantity($event) {
    console.log($event.target, $event.target.value)
    prodObject.quantity = $event.target.value;
    console.log(prodObject)
}

function updateColor($event) {
    console.log($event.target, $event.target.value)
    prodObject.color = $event.target.value;
    console.log(prodObject)
}


function initProdObject() {

}

// add to cart event andfunction

// needs a confirmation and link to cart page 

// localStorage.setItem => adds item to local storage
// localStorage.getItem => retrieves the item from local storage 

// if ordered is already in the cart, update quantity/color
// if the item is not already in the cart
// what about if the cart is empty
    

