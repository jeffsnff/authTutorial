require('dotenv').config({path: './config.env'})
const connectDB = require('./config/db')
const express = require('express')
const PORT = process.env.PORT || 5000;


connectDB()


const app = express()
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))










const server = app.listen(PORT, () => console.log(`Server running on Port : ${PORT}`))

process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error : ${err}`)
    server.close(() => process.exit(1))
})