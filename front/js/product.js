const _id = new URL(window.location.href).searchParams.get('id'); //returns the url of the current page
console.log(_id);


//set up the cart - 3 places local storage, array, and JSON
let cartString = localStorage.getItem('cart') || '[]'; // gets data from the cart or creates an empty array
// if(localStorage.getItem('cart')) {
//     cartString = localStorage.getItem('cart')
// } else {
//     cartString = '[]'
// }
let cartArray = JSON.parse(cartString); 
// JSON.parse, takes the string data and parses it into a useable javascript object
// objects that represent each item are stored in an array so we can store multiple items under a single name


// object that represents the product
const prodObject = {
    _id: '',
    name: '',
    imageUrl: '',
    altTxt: '',
    color: '',
    quantity: 1
}

//getting the item from the api with the ID of the current product
fetch('http://localhost:3000/api/products/' + _id) 
    .then(response => response.json())
    .then(data => {
        console.log(data);
        makeProductCard(data);
        initProdObject(data);
    })
    .catch(error => console.log(error));
  

function makeProductCard(obj) {
    // getting access to variables for DOM elements
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
    // listener for a change event that will run the updateQuantity function

    // add to cart
    addBtn.addEventListener('click', addToCart); 
    // listener for a click event that will run the addToCart function

    // color change pulldown
    for (let i=0; i < obj.colors.length; i++) {
        const pulldown = document.createElement('option');
        pulldown.setAttribute('value', obj.colors[i]);
        pulldown.value = obj.colors[i];
        pulldown.innerHTML = obj.colors[i]; 
        prodColors.appendChild(pulldown);
        prodColors.addEventListener('change', updateColor);
    }
}    

// update quantity function
function updateQuantity(event) {
    console.log(event.target, event.target.value)
    prodObject.quantity = event.target.value;
    console.log(prodObject)
}

// update color function
function updateColor(event) {
    console.log(event.target, event.target.value)
    prodObject.color = event.target.value;
    console.log(prodObject)
}

//initialize product
function initProdObject(object) {
    prodObject._id = object._id;
    prodObject.name = object.name;
    prodObject.imageUrl = object.imageUrl;
    prodObject.altTxt = object.altTxt;
    prodObject.price = object.price;


}

// add to cart event andfunction
function addToCart(event) {
    let pushToCart = true; // indicates whether to put the item in the cart
    
    // is it empty? 
    if (cartArray.length > 0) { 
        // iterates through each item in the cartArray to see if name and options matches current cart items
        for (let i = 0; i < cartArray.length; i++) { 
            if (prodObject.name === cartArray[i].name && 
                prodObject.color === cartArray[i].color) { 
                // if already in cart don't push, do increase quantity
                cartArray[i].quantity = cartArray[i].quantity + prodObject.quantity;
                // needs to be set to false because we do not want to push
                pushToCart = false;
                syncCart(); // calling the function syncCart
            } 
        }
    }
        
    if (pushToCart) {
        cartArray.push(prodObject);
        syncCart();
    }
}

function syncCart() {
    cartString = JSON.stringify(cartArray); // takes data and turns it into a JSON string
    localStorage.setItem('cart', cartString); // add the data to the cart localStorage
    cartArray = JSON.parse(cartString); // cartArray is the parsed version of the cartString object
}




    

