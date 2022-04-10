const express = require('express')
const router = express.Router();

const Users = require('../controller/user')

router.post('/create-post', Users.create)
router.get('/get-data', Users.getalldata)
router.put('/update/:id',Users.update)
router.delete('/delete-data/:id',Users.DeletebyId)

module.exports = router;