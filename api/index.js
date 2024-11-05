require('dotenv').config()
const express = require('express')
const cors = require('cors')

// db
// db connection
const {dbConnection} = require('./db/db.connection')

// app
const app = express()

// port
const PORT = process.env.PORT || 5000

// settings
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: true,
    methods: 'GET, POST, DELETE',
    credentials: true,
}))

// routes
// notes
app.use('/api/notes',require('./routes/notes.routes'))
// public
app.use('/public',express.static('public'))

// listening
app.listen(PORT,async ()=>{
    await dbConnection()
    console.log("listening...")
})


