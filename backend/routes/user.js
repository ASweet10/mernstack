const express = require("express")
const { signupUser, loginUser } = require("../controllers/userController")

const router = express.Router()

// Login route
// POST because we're sending data to server
router.post('/login', loginUser)

// Signup route 
router.post('/signup', signupUser)

module.exports = router