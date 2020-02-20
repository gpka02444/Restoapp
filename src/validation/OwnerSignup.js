const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validatorUserInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.name = !isEmpty(data.name) ? data.name: "";
  data.restaurantName = !isEmpty(data.restaurantName) ? data.restaurantName: "";
  data.phone = !isEmpty(data.phone) ? data.phone: "";


// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
// First Name checks
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "First Name field is required"
    }
// Restaurant Name Checks
    if (Validator.isEmpty(data.restaurantName)) {
        errors.restaurantName = "Restaurant Name field id required"
    }

// phone  checks
    if (Validator.isEmpty(data.phone)) {
        errors.phone = "Phone number is required"
    }
return {
    errors,
    isValid: isEmpty(errors)
  };
}