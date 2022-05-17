let productLocalStorage = JSON.parse(localStorage.getItem('cart'));


// if product is not in local storage
if (!productLocalStorage) { 
    
} else {
    // iterate through all items in the cart
    for (let i=0; i < productLocalStorage.length; i++) {
        // create article 
        let productArticle = document.createElement('article');
        document.querySelector('#cart__items').appendChild(productArticle);
        productArticle.className = 'cart__item';
        productArticle.setAttribute('data-id', productLocalStorage[i].idProduct);
        productArticle.setAttribute('data-color', productLocalStorage[i].color);

        // create image div
        let productDivImage = document.createElement('div');
        productArticle.appendChild(productDivImage);
        productDivImage.className = 'cart__item__img';

        // create image
        let productImage = document.createElement('img');
        productDivImage.appendChild(productImage);
        productImage.src = productLocalStorage[i].imageUrl;
        
        //create cart item content div
        let productItemContent = document.createElement('div');
        productArticle.appendChild(productItemContent);
        productItemContent.className = 'cart__item__content';

        //create cart item content description div
        let productItemContentDescription = document.createElement('div');
        productItemContent.appendChild(productItemContentDescription);
        productItemContentDescription.className = 'cart__item__content__description';

        //create cart item content settings div
        let productItemContentSettings = document.createElement('div');
        productArticle.appendChild(productItemContentSettings);
        productItemContentSettings.className = 'cart__item__content__settings';

        //create cart item content settings quantity div
        let productItemContentQuantity = document.createElement('div');
        productItemContentSettings.appendChild(productItemContentQuantity);
        productItemContentQuantity.className = 'cart__item__content__quantity';

        // add title
        let productName = document.createElement('h2');
        productItemContentDescription.appendChild(productName);
        productName.innerHTML = productLocalStorage[i].name;

        // add color
        let productColor = document.createElement('p');
        productArticle.appendChild(productColor);
        productColor.innerHTML = productLocalStorage[i].color;
        productColor.style.fontSize = '22px'; // increase the font size 

        // add price
        let productPrice = document.createElement('p');
        productArticle.appendChild(productPrice);
        productPrice.innerHTML = productLocalStorage[i].price + ' €'; // puts euro symbol in front of number 
        productPrice.style.fontSize = '22px';

        // add quantity
        let productQuantity = document.createElement('input');
        productItemContentQuantity.appendChild(productQuantity);
        productQuantity.value = productLocalStorage[i].quantity;
        productQuantity.className = 'itemQuantity';
        productQuantity.setAttribute('type', 'number');
        productQuantity.setAttribute('min', '1');
        productQuantity.setAttribute('max', '100');
        productQuantity.setAttribute('name', 'itemQuantity');
        productQuantity.style.fontSize = '22px';
    }
}

// want to add total price, total quantity price 
// add delete button and way to clear it from local storage