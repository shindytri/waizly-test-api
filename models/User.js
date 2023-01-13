const mongoose = require('mongoose')
const schema = mongoose.Schema

const UserSchema = new schema({
    username : {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    first_name:{
        type:String,
        // required:true
    },
    last_name:{
        type:String,
        // required:true
    },
    created_on:{
        type:Date,
        default:Date.now
    },
    deleted:{
        type:Number
    }
})

module.exports = User = mongoose.model('user',UserSchema)