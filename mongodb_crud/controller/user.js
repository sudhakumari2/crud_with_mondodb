const db = require('../connection/database');
const User = require('../model/schema')
const router = require('../routes/routes')
const Joi = require('joi');

// create post
const create = async(req, res)=>{
    const Schema = Joi.object({
        Name: Joi.string()
            .min(5)
            .max(30)
            .required(),
        Email: Joi.string()
            .email()
            .min(5)
            .max(50)
            .required(),
        password: Joi.string()
            .min(8)
            .max(16)
            .required()
    });
    let payload
    const validSchema = Schema.validate(req.body)
    if (validSchema.error) {
        // console.log(validSchema.error)
        return res.status(400).json({
            massage: validSchema.error.massage || "Bad Request",
            code: 400
        })
    } 
    else{
        payload = validSchema.value
    }
    try{
        payload = {
            Name: payload.Name,
            Email: payload.Email,
            password: payload.password
        }
        const conditions = { Email: validSchema.Email}
        const exits = await User.findOne(conditions)
        console.log(exits);
        if (exits) {
            return res.status(422).send({
                massage: "user already exits",
                status: 422,
                data: exits

            })
        }
        else {
            const result = await User.create(payload)
            console.log(result);
            return res.status(201).send({
                massage: "user added successfully",
                status: 201,
                data: result
            })

        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            massage: 'internal server Error',
            status: 500
        })
    }
    
}
// get all data
const getalldata = async (req, res)=>{
    try{
        const data = await User.find()
        console.log(data)
        if(data){
            return res.status(200).send({
                massage:"all data",
                status: 200,
                deta:data
            })
        }else{
            return res.status(400).json({
                massage: 'Data not found ' || "Bad Request",
                status: 400
            })
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            massage: 'internal server Error',
            status: 500
        })
    }
}

// update data 
const update = async(req, res)=>{
    const Schema = Joi.object({
        Name: Joi.string()
            .min(5)
            .max(30),
        Email: Joi.string()
            .email()
            .min(5)
            .max(50),
        password: Joi.string()
            .min(8)
            .max(16)
            
    });
    let payload
    const validSchema = Schema.validate(req.body)
    if (validSchema.error) {
        // console.log(validSchema.error)
        return res.status(400).json({
            massage: validSchema.error.massage || "Bad Request",
            code: 400
        })
    } 
    else{
        payload = validSchema.value
    }
    try{
        const result = await User.updateOne({_id:req.params._id},{
            Name:payload.Name,
            Email:payload.Email,
            password:payload.password})
        return res.status(201).send({
            massage: "user update successfully",
            status: 201,
            data: result
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            massage: 'internal server Error',
            status: 500
        })
    }
    
}
// delete data by id
const DeletebyId=async (req,res)=>{
    try {
        const exits = await User.deleteOne({_id: req.params._id })
        if (exits) {
            return res.status(200).send({
                massage:"user data delete",
                status: 200,
            })
        } else {
            return res.status(400).json({
                massage: 'Data  not found ' || "Bad Request",
                status: 400
            })
        }
    }
    catch (err){
        console.log(err);
        return res.status(500).json({
            massage: 'internal server Error',
            status: 500
        })
    }
}

module.exports = {create,getalldata, update, DeletebyId}