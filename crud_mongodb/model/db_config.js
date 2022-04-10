const mongoose = require('mongoose');
url = 'mongodb://localhost:27017/myProject'; 

module.exports = mongoose.connect(url,{useNewUrlParser:true})
.then((done)=>{
    console.log('connected successfuly!')
})
 .catch ((error) => {
    console.log(error)
})
