const mongoose = require('mongoose');
// const Joi = require('joy');

const userschema = new mongoose.Sca({
    name:{type:String,required: true,unique: false},
    user_name:{type:String,required: true,unique: true},
    email : {type:String,required : true, unique: true},
    password : {type:String,required : true, unique: true},
    user_id : {type: String, required : true,unique: true},
    followers:{type: Array, required: false, unique: false},
    following:{type: Array, required: false, unique: false},
    date : {
        type:Date,
        default: Date.now
    }
})

// Compile model from schema
var Users = mongoose.model('user',userschema);
module.exports = Users;