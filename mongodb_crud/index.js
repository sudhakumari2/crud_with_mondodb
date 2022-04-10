const mongoose = require('mongoose');
const express = require('express');
var app = express();
app.use(express.json())
const PORT = 3000;
const Users = require('./routes/routes')
app.use("/",Users)

app.listen(PORT,()=>{
    console.log(`server is running at.....${PORT} `)
})
