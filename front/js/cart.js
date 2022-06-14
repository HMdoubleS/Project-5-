// this is the cart array from local storage
let productLocalStorage = JSON.parse(localStorage.getItem('cart'));

// store product prices on object
const priceObject = {};
fetch('http://localhost:3000/api/products/')
    .then(response => response.json()) // takes json and turns it into a data structure
    .then(data => initPrices(data))
    .then(() => {
        buildPage();
        getTotals();
    })
    .catch(error => console.log(error));

function initPrices(array) {
    const length = array.length;
    for (let i=0; i < length; i++) {
        // id - key - property of an object
        // price - value - price that corresponds to that id
        priceObject[array[i]._id] = array[i].price; // array[i] is object
    }

    console.log(priceObject);
}

function buildPage() {

// if product is not in local storage
if (!productLocalStorage) { 
    cart = [];
} else {
    // iterate through all items in the cart
    for (let i=0; i < productLocalStorage.length; i++) {

        // create article 
        let productArticle = document.createElement('article');
        productArticle.classList.add('cart__item');
        productArticle.setAttribute('data-id', productLocalStorage[i]._id);
        productArticle.setAttribute('data-color', productLocalStorage[i].color);
        document.querySelector('#cart__items').appendChild(productArticle);

        // create image div
        let productDivImage = document.createElement('div');
        productDivImage.classList.add('cart__item__img');
        productArticle.appendChild(productDivImage);
        

        // create image
        let productImage = document.createElement('img');
        productImage.src = productLocalStorage[i].imageUrl;
        productImage.alt = productLocalStorage[i].altTxt;
        productDivImage.appendChild(productImage);
        
        //create cart item content div
        let productItemContent = document.createElement('div');
        productItemContent.classList.add('cart__item__content');
        productArticle.appendChild(productItemContent);
       

        //create cart item content description div
        let productItemContentDescription = document.createElement('div');
        productItemContentDescription.classList.add('cart__item__content__description');
        productItemContent.appendChild(productItemContentDescription);
        
        // add title
        let productName = document.createElement('h2');
        productName.innerHTML = productLocalStorage[i].name;
        productItemContentDescription.appendChild(productName);

        // add color
        let productColor = document.createElement('p');
        productColor.innerHTML = productLocalStorage[i].color;
        productItemContentDescription.appendChild(productColor);
        
        // add price, getting the price from the object not localStorage
        let productPrice = document.createElement('p');
        // let thing = productLocalStorage[i]._id;
        console.log(priceObject, 'at build');
        productPrice.innerHTML = ' €' + priceObject[productLocalStorage[i]._id]; // puts euro symbol in front of number 
        productItemContentDescription.appendChild(productPrice);

        //create cart item content settings div
        let productItemContentSettings = document.createElement('div');
        productItemContentSettings.classList.add('cart__item__content__settings');
        productItemContent.appendChild(productItemContentSettings);
        

        //create cart item content settings quantity div
        let productItemContentQuantity = document.createElement('div');
        productItemContentQuantity.classList.add('cart__item__content__settings__quantity');
        productItemContentSettings.appendChild(productItemContentQuantity);
        
        // add quantity text
        let productQuantityText = document.createElement('p');
        productQuantityText.innerHTML = 'Qté : ';
        productItemContentQuantity.appendChild(productQuantityText);

        // add quantity
        let productQuantity = document.createElement('input');
        productQuantity.value = productLocalStorage[i].quantity;
        productQuantity.className = 'itemQuantity';
        productQuantity.setAttribute('type', 'number');
        productQuantity.setAttribute('min', '1');
        productQuantity.setAttribute('max', '100');
        productQuantity.setAttribute('name', 'itemQuantity');
        productItemContentQuantity.appendChild(productQuantity);
        productQuantity.addEventListener('change', updateQuantity); 

        // create cart delete div 
        let productDeleteItem = document.createElement('div');
        productDeleteItem.classList.add('cart__item__content__settings__delete');
        productItemContentSettings.appendChild(productDeleteItem);

        // delete button text
        let productDelete = document.createElement('p');
        productDelete.className = 'deleteItem';
        productDelete.innerHTML = 'Delete';
        productDeleteItem.appendChild(productDelete);
        // delete button even listener
        productDelete.addEventListener('click', deleteItem);

        // order button
        const orderBtn = document.getElementById('order');
        orderBtn.addEventListener('click', (e) => {
            e.preventDefault();
        })
    }
}
}

// delete item function
function deleteItem(event){
    // remove element from the DOM
    console.log(event);
    const deleteBtn = event.target;
    const productCard = deleteBtn.parentElement.parentElement.parentElement.parentElement; // traversing the DOM to the article
    const productId = productCard.dataset.id; // grab the data-id of the item being deleted 
    const productColor = productCard.dataset.color // grab the data-color of the item being deleted
    productCard.remove();

    // remove item from the array
    // counts backwards through the array and when it finds the items with those property values it deletes it
    for (let i = productLocalStorage.length - 1; i >= 0; i--) {
        if (productId === productLocalStorage[i]._id && productColor === productLocalStorage[i].color) {
           productLocalStorage.splice(i, 1);
        }
    }
    // change total price and quantity in DOM to reflect deleted cart item
    getTotals();
    // update localStorage
    syncCart();
}

// modify quantity
function updateQuantity(e){
    console.log(e.target);
    let quantityInput = 0;
    const productCard = e.target.parentElement.parentElement.parentElement.parentElement; // traversing the DOM to the article
    console.log(productCard);
    const productId = productCard.dataset.id; // grab the data-id
    const productColor = productCard.dataset.color // grab the data-color

    for (let i=0; i < productLocalStorage.length; i++) {
        if (productId === productLocalStorage[i]._id && productColor === productLocalStorage[i].color) {
            
            // TODO: change quantity on object in cart
        }
    }
    // update localStorage
    syncCart();
    getTotals();
}

// total quantity and price on page load and when you change the quantity or delete an item
function getTotals(){
    // total quantity
    let productQte = document.getElementsByClassName('itemQuantity');
    let myLength = productQte.length;
    let totalQte = 0;

    for (let i=0; i < myLength; i++) {
        totalQte += productQte[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQte; // inserting the total quantity into the html

    // total price    
    let totalPrice = 0; 
        for (let i = 0; i < myLength; i++) { 
            totalPrice += (productQte[i].valueAsNumber * priceObject[productLocalStorage[i]._id]); // get price from object
        } // total price = price times the product quantity
    
    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;     
    syncCart();
}





// form data and event listeners for change events
// regular expressions for validation
let emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //www.regular-expressions.info/email.html
let charAlphaRegExp = /^[A-Za-z -]{3,32}$/;
let addressRegExp = /^[A-Za-z0-9 -#./&']{7,32}$/; 

//getting access to form data in the DOM
let form = document.querySelector('.cart__order__form');
let inputFirstName = document.getElementById('firstName');
let inputLastName = document.getElementById('lastName');
let inputAddress = document.getElementById('address');
let inputCity = document.getElementById('city');
let inputEmail = document.getElementById('email');


function getForm(){
    // first name change event
    form.firstName.addEventListener('change', function(){
        validFirstName(this);
    })

    // last name change event
    form.lastName.addEventListener('change', function(){
        validLastName(this);
    })

    // address change event
    form.address.addEventListener('change', function(){
        validAddress(this);
    })

    // city change event
    form.city.addEventListener('change', function(){
        validCity(this);
    })

    // email change event
    form.email.addEventListener('change', function(){
        validEmail(this);
    })

    //form data validation
    // first name validation
    let firstNameErrorMessage = document.getElementById('firstNameErrorMsg');
    function validFirstName(inputFirstName) {
        if (charAlphaRegExp.test(inputFirstName.value) == false) {
            firstNameErrorMessage.innerHTML = "Please enter your name";
        } else {
            return true;
        }
    };

    // the second way that I tried validation
    // let firstNameErrorMessage = document.getElementById('firstNameErrorMsg');
    // function validFirstName(inputFirstName) {
    //     if (document.form.inputFirstName.value == "" || inputFirstName.value == null || !charAlphaRegExp.test(inputFirstName) == false) {
    //         firstNameErrorMessage.innerHTML = 'Please provide your first name';
    //         return false;
    //     } else {
    //         firstNameErrorMessage.innerHTML = null;
    //         return true;
    //     }
    // };

    // last name validation
    let lastNameErrorMessage = document.getElementById('lastNameErrorMsg');
    function validLastName(inputLastName) {
        if (charAlphaRegExp.test(inputLastName) == false) {
            return false;
        } else {
            lastNameErrorMessage.innerHTML = null;
            return true;
        }
    }; 

    // address validation
    let addressErrorMessage = document.getElementById('addressErrorMsg');
    function validAddress(inputAddress) {
        if (addressRegExp.test(inputAddress) == false) {
            return false;
        } else {
            addressErrorMessage.innerHTML = null;
            return true;
        }
    }

    // city validation
    let cityErrorMessage = document.getElementById('cityErrorMsg');
    function validCity(inputCity) {
        if (charRegExp.test(inputCity) == false) {
            return false
        } else {
            cityErrorMessage.innerHTML = null;
            return true;
        }
    } 

    //email validation
    let emailErrorMessage = document.getElementById('emailErrorMsg');
    function validEmail(inputEmail) {
        if (emailRegExp.test(inputEmail) == false) {
            return false;
        } else {
            emailErrorMessage.innerHTML = null;
            return true;
        }
    } 
    syncCart();
}

// post form
function postForm(){
    let order = document.getElementById('order');
    order.addEventListener('click', (event) => {
        event.preventDefault();

        // contact object 
        let contact = {
                firstName: inputFirstName.value,
                lastName: inputLastName.value,
                address: inputAddress.value,
                city: inputCity.value,
                email: inputEmail.value,
        }
        console.log(contact);

        // creation of product array
        const products = [];
        for (let i = 0; i < productLocalStorage.length; i++) {
            products.push(productLocalStorage[i]._id);
        }
        console.log(products);
     
        
    // need to collect form data
    // need to create a POST request


    }

)}
postForm();




// updates the cart array
function syncCart() {
    let cartString = JSON.stringify(productLocalStorage); // takes data and turns it into a JSON string
    localStorage.setItem('cart', cartString); // add the data to the cart array localStorage
    productLocalStorage = JSON.parse(cartString); // productLocalStorage is the parsed version of the cartString
}
    
