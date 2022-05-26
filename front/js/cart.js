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

        // create cart delete div 
        let productDeleteItem = document.createElement('div');
        productDeleteItem.classList.add('cart__item__content__settings__delete');
        productItemContentSettings.appendChild(productDeleteItem);

        // delete button text
        let productDelete = document.createElement('p');
        productDelete.className = 'deleteItem';
        productDelete.innerHTML = 'Delete';
        productDeleteItem.appendChild(productDelete);
    }
}

// delete item 
const deleteItem = document.getElementsByClassName('deleteItem');
deleteItem.addEventListener('click', (e) => {

})




// total price function






// want to add total price, total quantity price 
// add delete button and way to clear it from local storage