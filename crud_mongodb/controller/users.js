const db = require('../model/db_config')
let  { generateAccessToken, authenticateToken } = require('../jwt/auth/auth')
const User = require('../model/user_schema');
var bodyParser = require('body-parser');
const router = require('../router/user');

exports.create_user = async (req,res) =>{
    //      to insert single document
    const userDetails = new User ({
                        name: req.body.name,
                        user_name: req.body.user_name,
                        email : req.body.email,
                        password: req.body.password,
                        user_id: req.body.user_id,
                        followers: req.body.followers ? req.body.followers:[],
                        following: req.body.following ? req.body.following:[]
                    })
    try {
                // to insert single document
        await userDetails.save();

// to insert multiple documents at the same time 

        res.send({msg:"Inserted successfuly!"})
    } catch (error) {
        res.send({er_msg:error})
    }
    
}
exports.user_login = async(req, res)=>{
    
    try { 
        const getUsers = await User.find(req.body);
        if(getUsers.length){
        
            var data = await generateAccessToken(getUsers[0])
            // console.log(data)
            res.send({sucess: true, message: "login sucessfully", user_token:data})
        }
        else{
            res.send({sucess: false, message: "invalid login details", user_token:null})
        }
        }
    catch(err){
        console.log(err)
        res.send(err)
    }
    
}
// TO FOLLOW THE USER
exports.follow_user = async (req, res)=>{
    try{
        let user_id = req.body.user_id
        let userData = await User.find({user_id: user_id},{followers:1})
        let listfollow = userData[0].followers
        listfollow.push(req.decode.username.user_id)
        await User.updateOne({user_id: user_id},
            {$set:{followers:listfollow}},
            )
        let myUserData = await User.find({user_id:req.decode.username.user_id },{following:1})
        let listfollowing = myUserData[0].following
        listfollowing.push(user_id)
        await User.updateOne({user_id: req.decode.username.user_id},
            {$set:{following:listfollowing}},
            )
        res.send({sucess: true, message: "follow Successfuly"})

    }
    catch(err){
        res.send({sucess: false, message: err})
    }
    

}



// TO GET FOLLOWERS
exports.followers = async (req, res)=>{
    try{
        let userData = await User.find({user_id: {$in:req.decode.username.followers}},{name:1,user_id:1})
        res.send({sucess: true, data: userData})
    }
    catch(err){
        res.send({sucess: false, message: err})

    }
}

// TO GET FOLLOWING
exports.following = async (req, res)=>{
    try{
        let userData = await User.find({user_id: {$in:req.decode.username.following}},{name:1,user_id:1})
        res.send({sucess: true, data: userData})
    }
    catch(err){
        res.send({sucess: false, message: err})

    }
}

// to dislplay users after inserting them in them in the database
exports.read_user = async (req,res)=>{
    try {
        const getUsers = await User.find();
        res.send({msg:getUsers})
            console.log('user has been displayed!')
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

// to update the user's detaisl by user_email

exports.user_edit = async (req,res)=>{
    var id = req.params.id;
    try {
        await User.updateOne({user_id: id},
                        {$set:req.body},
                        )
        console.log("updating... ",id)
        res.send({msg:"document udpated successfully!"})
    } catch (err) {
        console.log(err)
        res.send({errmsg:err})
        
    }
}


// to delete the user permannantly by it's email
exports.delete = async (req,res)=>{
    var id = req.params.user_id;
    try {
        let check = await User.deleteOne({user_id:id});
        console.log('deleting....',check)
        res.send({msg:"deleted successfuly!"})
    } catch (error) {
        console.log("this is deleting error",error)
        res.send({errmsg:"this is deleting error",error});
    }
}
