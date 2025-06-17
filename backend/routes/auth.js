const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Assuming you have a User model defined in models/User.js
const { body, validationResult } = require("express-validator"); // validationResult is a function from express-validator that checks for validation errors
// const bcrypt = require("bcryptjs"); // Uncomment if you want to hash passwords before saving them
// const jwt = require("jsonwebtoken"); // Uncomment if you want to use JWT for authentication

// Create a User using : POST "/api/auth/createuser" (no login/authentication required)
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters long").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {
    // if there are validation errors, return a 400 Bad Request response with the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //400 Bad Request + json array of errors
    }

    // mongoose method to create a new user +  req.body contains the data sent in the request body
    // checks whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user); //null if user not found, otherwise user object
      if (user) {
        return res.status(400).json({
          error: "Sorry a user with this email already exists",
        });
      }
      // Create a new user if no user with this email exists no every time we reach this point, we know that the email is unique
      user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });
      res.json(user); // Return the created user as JSON response shown in Postman or Thunder Client
    } catch (error) {
      console.error("Error creating user:", error.message);
      res.status(500).json({
        error: "Failed to create user due to server internal error! ", //Usered spellic error
        message: error.message,
      }); // Handle errors if needed
    }

    // async await so no need to use .then() and .catch() here
    // .then((user) => res.json(user)) //promise to return the created user Return the created user as JSON response
    //   .catch((err) => {
    //     console.error("Error creating user:", err);
    //     res.status(500).json({
    //       error: "Failed to create user due to server internal error,unique emmail",
    //       message: err.message,
    //     });
    //   }); // Handle errors if needed

    // res.send(req.body) bcz res.json(user));
    //res.send('Hello Himanshu! This is the auth route.');
  }
);

module.exports = router;
