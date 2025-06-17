const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model defined in models/User.js


// Create a User using : POST "/api/auth/" (no login/authentication required)
router.post('/', (req, res) => {
    
    console.log(req.body);
    const user = User(req.body);     // Here you would typically save the user to the database
    user.save() //data saved to database 
    
    res.send(req.body)
    //res.send('Hello Himanshu! This is the auth route.');
})

module.exports = router;
