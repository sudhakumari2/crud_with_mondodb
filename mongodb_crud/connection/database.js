const mongoose = require('mongoose')
url = 'mongodb://localhost:27017/DB';
module.exports = mongoose.connect(url,{useNewUrlParser: true})
.then((done)=>{
    console.log("connected successfully");
})
.catch((err)=>{
    console.log(err);
})