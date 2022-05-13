let productLocalStorage = JSON.parse(localStorage.getItem('cart'));

function getCart(){
    if (productLocalStorage === null || productLocalStorage == 0) {
        const emptyCart = `<p>Your cart is empty</p>`;
        positionEmptyCart.innerHTML = emptyCart;
    } else {
    for (let product in productLocalStorage){
        
    }  
  }
}