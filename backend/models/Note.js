const mongoose = require('mongoose');
const { use } = require('react');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference to the User model 
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General",
    },
    date: {
        type: Date,
        default: Date.now,
    },    
    
});

module.exports = mongoose.model('notes', NotesSchema); // notes table/collection name in the database