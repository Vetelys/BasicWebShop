const responseUtils = require('../utils/responseUtils');
const products = require('../products.json');
/**
 * Send all products as JSON
 *
 * @param {http.ServerResponse} response
 */
const getAllProducts = async response => {
  const allproducts = products.map(product => ({ ...product }));
  return responseUtils.sendJson(response, allproducts, 200);
};

module.exports = { getAllProducts };