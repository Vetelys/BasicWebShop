const { getCredentials } = require("../utils/requestUtils");
const User = require("../models/user");

/**
 * Get current user based on the request headers
 *
 * @param {http.IncomingMessage} request
 * @returns {Object|null} current authenticated user or null if not yet authenticated
 */
const getCurrentUser = async request => {
  
  const credentials = getCredentials(request);
  if(!credentials) return null;
  try
  {
    const found_user = await User.findOne({email: credentials[0]}).exec()
    const password = credentials[1]
    if(found_user.checkPassword(password)){
      return found_user
    }else{
      return null;
    }
  }
  catch(err)
  {
    return null;
  }
};

module.exports = { getCurrentUser };