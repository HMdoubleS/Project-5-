let productLocalStorage = JSON.parse(localStorage.getItem('cart'));

// if product is not in local storage
if (!productLocalStorage) { 
    
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
        
        // add price
        let productPrice = document.createElement('p');
        productPrice.innerHTML = ' €' + productLocalStorage[i].price; // puts euro symbol in front of number 
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
        productQuantity.addEventListener('click', getTotals);

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
// delete item function
function deleteItem(event){
    // remove element from the DOM
    console.log(event);
    const deleteBtn = event.target;
    const productCard = deleteBtn.parentElement.parentElement.parentElement.parentElement;
    productCard.remove(); 
    // change total price in DOM
    // changePrice(event)
    // change total quantity in DOM
    // modifyQte(event)
    // removed from localStorage
    syncCart();
    
}

// total quantity and price
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
            totalPrice += (productQte[i].valueAsNumber * productLocalStorage[i].price);
        } // total price = price times the product quantity
    
    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;     
}

getTotals();

// modify quantity 
function modifyQte(){
// not actually sure how this would be different than the totals functions

}


// getting form data and event listeners
let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"); 

function getForm(){
    let form = document.querySelector('.cart__order__form');
    let inputFirstName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAddress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputEmail = document.getElementById('email');

    // first name event
    form.firstName.addEventListener('change', function(){
        validFirstName(this);
    })

    // last name event
    form.lastName.addEventListener('change', function(){
        validLastName(this);
    })

    // address event
    form.address.addEventListener('change', function(){
        validAddress(this);
    })

    // city event
    form.city.addEventListener('change', function(){
        validCity(this);
    })

    // email event
    form.email.addEventListener('change', function(){
        validEmail(this);
    })

    // first name validation
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMessage = document.getElementById('firstNameErrorMsg');
        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMessage.innerHTML = '';
        } else {
            firstNameErrorMessage.innerHTML = 'please fill in this field';
        }
    } 

    // last name validation
    const validLastName = function(inputLastName) {
        let lastNameErrorMessage = document.getElementById('lastNameErrorMsg');
        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMessage.innerHTML = '';
        } else {
            lastNameErrorMessage.innerHTML = 'please fill in this field';
        }
    } 

    // address validation
    const validAddress = function(inputAddress) {
        let addressErrorMessage = document.getElementById('addressErrorMsg');
        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMessage.innerHTML = '';
        } else {
            addressErrorMessage.innerHTML = 'please fill in this field';
        }
    }

    // city validation
    const validCity = function(inputCity) {
        let cityErrorMessage = document.getElementById('cityErrorMsg');
        if (charRegExp.test(inputCity.value)) {
            cityErrorMessage.innerHTML = '';
        } else {
            cityErrorMessage.innerHTML = 'please fill in this field';
        }
    } 

    //email validation
    const validEmail = function(inputEmail) {
        let emailErrorMessage = document.getElementById('emailErrorMsg');
        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMessage.innerHTML = '';
        } else {
            emailErrorMessage.innerHTML = 'please fill in this field';
        }
    } 
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

        // creation of product array
        let cart = JSON.parse(localStorage.getItem('cart'));
        let products = [];
        for (let i = 0; i < cart.length; i++) {
            products.push(cart[i].id);
        }
    }

    // needs form and product values
    // needs a fetch call and to also link to confirmation page


)}



// need a syncCart function for this page
function syncCart(){
    localStorage.setItem('cart', JSON.stringify(productLocalStorage));
}
    
