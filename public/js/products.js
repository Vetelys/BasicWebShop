const addToCart = (productId, productName) => {
  // TODO 9.2
  // use addProductToCart(), available already from /public/js/utils.js
  // /public/js/utils.js also includes createNotification() function
  addProductToCart(productId);
  const message = `Added ${productName} to cart!`
  createNotification(message, 'notifications-container', true);

};

(async() => {
  //TODO 9.2 
  // - get the 'products-container' element
  // - get the 'product-template' element
  // - use getJSON(url) to get the available products
  // - for each of the products:
  //    * clone the template
  //    * add product information to the template clone
  //    * remember to add an event listener for the button's 'click' event, and call addToCart() in the event listener's callback
  // - remember to add the products to the the page
  const productContainer = document.querySelector('#products-container');
  const productTemplate = document.querySelector('#product-template');
  const products = await getJSON('/api/products');
  products.forEach(product =>{
    const ProductClone = productTemplate.content.cloneNode(true);
    ProductClone.querySelector('.product-name').id = `name-${product._id}`;
    ProductClone.querySelector('.product-description').id = `description-${product._id}`;
    ProductClone.querySelector('.product-price').id = `price-${product._id}`;
    ProductClone.querySelector('.product-name').innerHTML = product.name;
    ProductClone.querySelector('.product-description').innerHTML = product.description;
    ProductClone.querySelector('.product-price').innerHTML = product.price;
    const button = ProductClone.querySelector("button");
    ProductClone.querySelector(".item-row").id = product.name;
    button.id = `add-to-cart-${product._id}`;
    button.addEventListener('click', () => addToCart(product._id, product.name));
    productContainer.append(ProductClone);
  })
})();