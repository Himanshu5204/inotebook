const mongoose = require('mongoose');
const { Schema } = mongoose; // Import Schema from mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', UserSchema); // Create a model from the schema
User.createIndexes(); // Create indexes for the User model
module.exports = User; // Export the User model