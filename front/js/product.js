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

// color change pulldown
    for (let i=0; i < obj.colors.length; i++) {
        const pulldown = document.createElement('option');
        pulldown.setAttribute('value', obj.colors[i]);
        pulldown.value = obj.colors[i];
        pulldown.innerHTML = obj.colors[i]; 
        prodColors.appendChild(pulldown);
        pulldown.addEventListener('change', obj.colors);
    }

// add to cart 
function addToCart() {
    addBtn.addEventListener('click', addToCart);
    const quantityChoice = document.querySelector('#quantity');
    const colorChoice = document.querySelector('#colors');

    if (quantityChoice > 0 && quantityChoice <= 100 && quantityChoice != 0 && colorChoice != 0) {
        const productOptions = {
            id: obj._id,
            name: obj.name,
            img: obj.imgUrl,
            altText: obj.altTxt,
            description: obj.description,
            price: obj.price,
            color: colorChoice,
            quantity: quantityChoice
        }
   }

// confirmation and link to cart page 
window.location.href = 'cart.html';




// localStorage.setItem => adds item to local storage
// localStorage.getItem => retrieves the item from local storage 


// initializing local storage
const productLocalStorage = JSON.parse(localStorage.getItem('product'));

    if (productLocalStorage) {
     // if ordered is already in the cart

    } else {
        // if the item is not already in the cart

    } else {
        // if the cart is empty

    }
}
}

//need to link the cart button to the cart page
