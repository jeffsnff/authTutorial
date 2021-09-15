const nodemailer = require('nodemailer')

const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            password: process.env.EMAIL_PASSWORD
        }
    })
}