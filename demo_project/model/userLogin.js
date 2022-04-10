const mongoose = require('mongoose');
const express = require('express');
// const { ValidationError } = require('mongoose');
// const { string } = require('joi');
const app = express()
app.use(express.json());

const userschema = new mongoose.Schema({
    name:{type:String,require:true},
    email : {type:String,required : true, unique: true},
    password : {type:String,required : true, unique: true},
    user_id : {type: String, required : true},
    date : {
        type:Date,
        default: Date.now
    }
})

// Compile model from schema
var Users = mongoose.model('user',userschema);
module.exports = Users;