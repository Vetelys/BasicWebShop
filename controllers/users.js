const responseUtils = require('../utils/responseUtils');
const User = require("../models/user");


/**
 * Send all users as JSON
 *
 * @param {http.ServerResponse} response
 */
const getAllUsers = async response => {
  const users = await User.find({});
  return responseUtils.sendJson(response, users, 200);
};

/**
 * Delete user and send deleted user as JSON
 *
 * @param {http.ServerResponse} response
 * @param {string} userId
 * @param {Object} currentUser (mongoose document object)
 */
const deleteUser = async(response, userId, currentUser) => {
  const deletedUser = await User.findById(userId).exec();
  if(!deletedUser) return responseUtils.notFound(response);
  else if (userId === currentUser.id){
    return responseUtils.badRequest(response);
  }
  else{
    await User.deleteOne({ _id: userId });
    return responseUtils.sendJson(response, deletedUser, 200);
  }
};

/**
 * Update user and send updated user as JSON
 *
 * @param {http.ServerResponse} response
 * @param {string} userId
 * @param {Object} currentUser (mongoose document object)
 * @param {Object} userData JSON data from request body
 */
const updateUser = async(response, userId, currentUser, userData) => {
  const roles = ['customer', 'admin'];
  if(!userData.role || !roles.includes(userData.role)) return responseUtils.badRequest(response);
  const updatedUser = await User.findById(userId).exec();
  if(userId === currentUser.id) return responseUtils.badRequest(response);
  if(!updatedUser) return responseUtils.notFound(response);
  else{
    updatedUser.role = userData.role;
    return responseUtils.sendJson(response, updatedUser, 200);
  }  
};

/**
 * Send user data as JSON
 *
 * @param {http.ServerResponse} response
 * @param {string} userId
 * @param {Object} currentUser (mongoose document object)
 */
const viewUser = async(response, userId, currentUser) => {
  if(!currentUser) return responseUtils.basicAuthChallenge(response);
  else if(currentUser.role !== 'admin') return responseUtils.forbidden(response);
  const getUser = await User.findById(userId).exec();
  if(getUser) return responseUtils.sendJson(response, getUser, 200);
  else return responseUtils.notFound(response);
};

/**
 * Register new user and send created user back as JSON
 *
 * @param {http.ServerResponse} response
 * @param {Object} userData JSON data from request body
 */
const registerUser = async(response, userData) => {
  userData.role = 'customer';
  const newuser = new User(userData);
  newuser.save()
    .then(() => {
      return responseUtils.createdResource(response, newuser);
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
      return responseUtils.badRequest(response, error.errors);  
    });
};

module.exports = { getAllUsers, registerUser, deleteUser, viewUser, updateUser };