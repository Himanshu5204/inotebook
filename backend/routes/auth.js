const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Assuming you have a User model defined in models/User.js
const { body, validationResult } = require("express-validator"); // validationResult is a function from express-validator that checks for validation errors
const bcrypt = require("bcryptjs"); // Uncomment if you want to hash passwords before saving them
const jwt = require("jsonwebtoken"); // Uncomment if you want to use JWT for authentication
const fetchuser = require("../middleware/fetchuser"); //The ../ means "go up one directory level". bcz it it used in auth.js file

const JWT_SECRET = "Himanshu@123"; // Secret key for JWT, should be stored in an environment variable in production

// Route 1: Create a User using : POST "/api/auth/createuser" (no login/authentication required)
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
      const salt = await bcrypt.genSalt(10); // Generate a salt for hashing the password
      secPass = await bcrypt.hash(req.body.password, salt); // Hash the password using bcrypt
      console.log("Hashed Password:", secPass); // Log the hashed password for debugging
      // Create a new user if no user with this email exists no every time we reach this point, we know that the email is unique
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const Data = {
        user: {
          id: user.id, // user._id is the unique identifier for the user in MongoDB
        },
      };
      const authToken = jwt.sign(Data, JWT_SECRET); // Sign the JWT with the user data and secret key
      // console.log("JWT Token:", authToken); // Log the JWT token for debugging
      // res.json({authToken:authToken,}); same as below when someone give token we get above Data
      res.json(authToken); // Return the created user as JSON response shown in Postman or Thunder Client
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

// Route 2: Authenticate a User using : POST "/api/auth/login" (no login/authentication required)
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // if there are validation errors, return a 400 Bad Request response with the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //400 Bad Request + json array of errors
    }

    // mongoose method to find a user by email
    const { email, password } = req.body; // Destructure email and password from request body
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({
          error: "Please try to login with correct credentials", //as email not found
        });
      }

      // Compare the provided password with the hashed password stored in the database
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const Data = {
        user: {
          id: user.id, // user._id is the unique identifier for the user in MongoDB
        },
      };
      const authToken = jwt.sign(Data, JWT_SECRET); // Sign the JWT with the user data and secret key
      //console.log("JWT Token:", authToken); // Log the JWT token for debugging
      success = true;
      res.json({success , authToken}); // Return the JWT token as JSON response
    } catch (error) {
      console.error("Error logging in:", error.message);
      res.status(500).json({
        error: "Failed to login due to server internal error!",
        message: error.message,
      }); // Handle errors if needed
    }
  }
);

// Route 3: Get logged-in User details using : POST "/api/auth/getuser" (login required)
router.post("/getuser",fetchuser, async (req, res) => {
  try {
    // Get the user ID from the JWT token
    const userId = req.user.id; // Assuming req.user is populated with the authenticated user's data above login Data mathi aavse
    const user = await User.findById(userId).select("-password"); // Exclude password from the response
    res.json(user); // Return the user details as JSON response res.send(user) is also fine
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    res.status(500).json({
      error: "Failed to fetch user details due to server internal error!",
      message: error.message,
    }); // Handle errors if needed
  }
});
module.exports = router;
