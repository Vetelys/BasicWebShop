const addToCart = productId => {
    // TODO 9.2
  // use addProductToCart(), available already from /public/js/utils.js
  // call updateProductAmount(productId) from this file
  addProductToCart(productId);
  updateProductAmount(productId);
};

const decreaseCount = productId => {
  // TODO 9.2
  // Decrease the amount of products in the cart, /public/js/utils.js provides decreaseProductCount()
  // Remove product from cart if amount is 0,  /public/js/utils.js provides removeElement = (containerId, elementId
  const count = decreaseProductCount(productId);
  if (count === 0){
    const child = document.getElementById(`price-${productId}`)
    child.parentNode.remove();
  }
  else{
    updateProductAmount(productId);
  }

};

const updateProductAmount = productId => {
  // TODO 9.2
  // - read the amount of products in the cart, /public/js/utils.js provides getProductCountFromCart(productId)
  // - change the amount of products shown in the right element's innerText
  document.querySelector(`#amount-${productId}`).innerHTML = `${getProductCountFromCart(productId)}x`;


};

const placeOrder = async() => {
  // TODO 9.2
  // Get all products from the cart, /public/js/utils.js provides getAllProductsFromCart()
  // show the user a notification: /public/js/utils.js provides createNotification = (message, containerId, isSuccess = true)
  // for each of the products in the cart remove them, /public/js/utils.js provides removeElement(containerId, elementId)
  const cartProducts = getAllProductsFromCart();
  message = "Successfully created an order!";
  createNotification(message, 'notifications-container', true);
  const cartContainer = document.getElementById("cart-container");
  
  for (let i = cartContainer.childNodes.length - 1; i >= 0; i--) {
    cartContainer.removeChild(cartContainer.childNodes[i]);
  }

  clearCart();

};

(async() => {
  // TODO 9.2
  // - get the 'cart-container' element
  // - use getJSON(url) to get the available products
  // - get all products from cart
  // - get the 'cart-item-template' template
  // - for each item in the cart
  //    * copy the item information to the template
  //    * remember to add event listeners for cart-minus-plus-button cart-minus-plus-button elements. querySelectorAll() can be used to select all elements with each of those classes, then its just up to finding the right index
  // - in the end remember to append the modified cart item to the cart 
  const products = await getJSON('/api/products');
  const cartContainer = document.querySelector('#cart-container');
  const cartTemplate = document.querySelector('#cart-item-template');
  const cartProducts = getAllProductsFromCart();

  const Orderbutton = document.querySelector("#place-order-button")
  Orderbutton.addEventListener("click", () => placeOrder())

  cartProducts.forEach(product =>{
    const ProductClone = cartTemplate.content.cloneNode(true);
    const cartProduct = products.find(elem => elem._id === product.name);

    if(cartProduct){
      ProductClone.id = product.name;
      ProductClone.querySelector('.product-name').id = `name-${product.name}`;
      ProductClone.querySelector('.product-amount').id = `amount-${product.name}`;
      ProductClone.querySelector('.product-price').id = `price-${product.name}`;
      ProductClone.querySelector('.product-name').innerHTML = cartProduct.name;
      ProductClone.querySelector('.product-amount').innerHTML = `${product.amount}x`
      ProductClone.querySelector('.product-price').innerHTML = cartProduct.price;

      const buttons = ProductClone.querySelectorAll(".cart-minus-plus-button");
      buttons[0].id = `plus-${product.name}`;
      buttons[1].id = `minus-${product.name}`;

      buttons[0].addEventListener('click', () => addToCart(product.name));
      buttons[1].addEventListener('click', () => decreaseCount(product.name));
      cartContainer.append(ProductClone);
    }
  }
  )


})();