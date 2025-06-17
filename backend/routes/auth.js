const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Assuming you have a User model defined in models/User.js
const { body, validationResult } = require("express-validator");

// Create a User using : POST "/api/auth/" (no login/authentication required)
router.post(
  "/",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters long").isLength({
      min: 5,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //400 Bad Request + json array of errors
    }

    // mongoose method to create a new user
    User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    })
      .then((user) => res.json(user)) //promise to return the created user Return the created user as JSON response
      .catch((err) => {
        console.error("Error creating user:", err);
        res.status(500).json({
          error: "Failed to create user",
          message: err.message,
        });
      }); // Handle errors if needed

    // res.json({error:"Please enter a valid/unique name, email, and password",message:err.message});
    //  If validation fails, return an error message + So you're sending res.json(...) twice — once in .then(), and once right after, causing the crash.

    //  .catch(err => {
    //     console.error("Error creating user:", err);
    //     res.status(500).json({ error: "Internal Server Error" }); //500 Internal Server Error

    // res.send(req.body) bcz res.json(user));
    //res.send('Hello Himanshu! This is the auth route.');
  }
);

module.exports = router;
