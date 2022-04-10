let  { generateAccessToken, authenticateToken } = require('../jwt/auth/auth')
const express = require('express');
const router  = express.Router();
var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }));
const Users = require('../controller/users')

router.use(express.json())
// post request to insert users data 
router.post('/create',Users.create_user);

//GET request to display the users
router.get('/display',authenticateToken,Users.read_user);

// PUT request to update user's value
router.put('/edit/:id',authenticateToken,Users.user_edit);

// post request to login users
router.post('/user_login',Users.user_login);

// DELETE request to delete the users
router.delete('/delete/:id',authenticateToken,Users.delete);

// add follower 
router.post('/follow_user',authenticateToken, Users.follow_user);

// get followers
router.get('/followers',authenticateToken, Users.followers);

// get following
router.get('/following',authenticateToken, Users.following);


module.exports = router;