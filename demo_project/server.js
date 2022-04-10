const db = require('./model/db');
const userlogin = require('../model/userLogin')
const Users = require('./router/routes')
const express = require('express');

var app = express()
app.use(express.json())

const port = 4000;
// to handle users requests 

app.use(Users);

app.get('/',(req,res)=>{
    res.send("Hi you are welcome on home page")
})


console.log('working')
app.listen(port,()=>{
    console.log(`server is running on port, ${port}`)
})
