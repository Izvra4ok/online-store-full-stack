require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const fileUpload = require("express-fileupload")
const errorHandler = require('./middleware/ErrorHandlingMiddeware')
const path = require("path")

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
}));

app.use(express.json())
app.use(express.static(path.resolve(__dirname, "static",)))
app.use(fileUpload({}))
app.use('/api', router)

// Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Serve   r started on port ${PORT}`))
    } catch (e) {
        console.log("Unable to connect to the database",e)
    }
}


start()