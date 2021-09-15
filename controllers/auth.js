const User = require('../models/User')
const ErrorResponse = require('../utils/errResponse')



exports.register = async (req, res, next) => {
    const {username, email, password} = req.body

    try {
        const user = await User.create({
            username, email, password
        })

        sendToken(user, 201, res)

    } catch(error){
       next(error)
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body
    
    if(!email || !password){
        return next(new ErrorResponse('Please provide an email and password', 400))
    }

    try {
        const user = await User.findOne({ email }).select('+password')

        if(!user){
            // res.status(404).json({ success: false, error: "Invalid credentials!"})
            return next(new ErrorResponse('Username or Password are incorrect', 404))
        }
        const isMatch = await user.matchPasswords(password)

        if(!isMatch){
            // res.status(404),json({success: false, error: "Username or password not correct!"})
            return next(new ErrorResponse('Username or Password are incorrect', 401))
        }

        sendToken(user, 200, res)
    } catch (error) {
        res.status(500).json({ success: false, error: error.message})
    }
}

exports.forgotpassword = async (req, res, next) => {
    const { email } = res.body
    try {
        const user = await User.findOne({email})

        if(!user){
            return next(new ErrorResponse("Email could not be sent", 404))
        }

        const resetToken = user.getResetPasswordToken()

        await user.save()

        const resetURL = `http://localhost:3000/passwordreset/${resetToken}`
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go tot this link to reset your password</p>
            <a href=${resetURL} clicktracking=off>${resetURL}</a>
        `
        try {
            
        } catch (error) {
            
        }
    } catch (error) {
        
    }
}

exports.resetpassword = (req, res, next) => {
    res.send('Reset Password Route')
}


const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken()
    res.status(statusCode).json({success: true, token})
}