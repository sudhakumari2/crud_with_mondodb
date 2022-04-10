const mongoose = require('mongoose');
const userschema = new mongoose.Schema({
    Name:{type: String, required: true},
    Email:{type: String, required: true, unique: true},
    password:{type: String, required: true, unique: true},
    date:{type: Date, default: Date.now}
})
var Users = mongoose.model('users',userschema);

module.exports = Users;