const validator = require('validator')
const isEmpty = require('../validation/is-empty')

module.exports = function validateRegisterInput(data){
    let errors = {}

    data.username = !isEmpty(data.username) ? data.username:""
    data.email = !isEmpty(data.email) ? data.email:""
    data.password = !isEmpty(data.password) ? data.password:""
    data.password2 = !isEmpty(data.password2) ? data.password2:""

    if (!validator.isLength(data.username,{min:3, max:20})){
        errors.name = "Username must be between 3 - 20 characters"
    }

    if(!validator.isLength(data.password,{min:6})){
        errors.password = "Password must have at least 6 digit";
    }


    if(validator.isEmpty(data.username)){
        errors.name = "Missing username value";
    }
    
    if(validator.isEmpty(data.email)){
        errors.email = "Missing email value";
    }

    if(!validator.isEmail(data.email)){
        errors.email = "Invalid email value";
    }

    if(validator.isEmpty(data.password)){
        errors.password = "Missing Password value";
    }   

    if(!validator.equals(data.password2,data.password)){
        errors.password2 = "Password and confirmed password value not match";
    }

    if(validator.isEmpty(data.password2)){
        errors.password2 = "Missing confirm password value";
    }

    return {
        errors,
        isValid : isEmpty(errors)
    }
}