const express = require('express')
const router = express.Router()

const {register, login, forgotpassword, resetpassword} = require('../controllers/auth.js')

router.route('/register').post(register)

router.route('/login').post(login)
// router.post('/login', () => {
//     console.log("hello") //This works. Need to figure out why login doesn't work
//     login
// })

router.route('/forgotpassword').post(forgotpassword)

router.route('/resetpassword/:resetToken').put(resetpassword)



















module.exports = router