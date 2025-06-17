// This middleware function fetches the user from the database based on the JWT token provided in the request header.

const jwt = require("jsonwebtoken"); // Uncomment if you want to use JWT for authentication
const User = require("../models/User"); // Import the User model
const JWT_SECRET = "Himanshu@123"; // Secret key for JWT, should be stored in an environment variable in production


const fetchuser = async (req, res, next) => { //next for calling next function see in auth.js getuser
  // Get the user from the JWT token and add id to req object
  const token = req.header("auth-token"); // Get the token from the request header in over case thunder client header is auth-token
  if (!token) {   // If the token is not provided, return a 401 Unauthorized response
    return res.status(401).send({ error: "Please authenticate using a valid token" }); // If no token is provided, return 401 Unauthorized
  }
  try {
    const data = jwt.verify(token, JWT_SECRET); // Verify the token using the secret key
    req.user = await User.findById(data.user.id); // Find the user by ID from the token data
    next(); // Call the next middleware function
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).send({ error: "Internal server error" }); // If there's an error, return 500 Internal Server Error
  }
};

module.exports = fetchuser;