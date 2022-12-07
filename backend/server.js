require('dotenv').config()

const express = require('express')
const mongoose = require("mongoose")
const workoutRoutes = require('./routes/workouts')

const app = express()

//Middleware, things express will use

//Checks incoming requests
// 
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
// Attach all routes from workouts.js to app
app.use('/api/workouts/', workoutRoutes)

mongoose.connect(process.env.MONGDB_URI)
    // Once connected to database...
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to DB & listening on port ' + process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

