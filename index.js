const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
const db = require('./config/keys').mongoURI
const users = require('./routes/users')

mongoose
    .connect(db)
    .then(() => console.log('Database connected!'))
    .catch((err) => console.log('Cannot connect to the database!'))

app.get('/api',(req, res) => {
    res.json({
        available_endpoints : [
            'user_management'
        ]
    })
})

app.use('/api',users)

const PORT = process.env.PORT || 8080

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`)
})