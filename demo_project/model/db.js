const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myProject',{
    useNewUrlParser: true}, (err)=>{
        if(!err){console.log('mongodb connection success')}
        else{console.log('err is db connection'+err)}
    });

require('./userLogin')