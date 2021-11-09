const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()
const { forwardAuthenticated } = require('../middleware/auth')

router.get('/',forwardAuthenticated,UserController.index)
// router.post('/', (req, res) => {
//     res.render('index.ejs', { name: req.params.username })
//  })

module.exports = router