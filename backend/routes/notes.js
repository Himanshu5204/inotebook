const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Note = require("../models/Note"); // Import the Note model
const { body, validationResult } = require("express-validator"); // Uncomment if you want to use express-validator for input validation

// Route 1 : Fetch all notes using: POST "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }); // Fetch all notes for the logged-in user
    res.json(notes); // Send the fetched notes as a JSON response
  } catch (error) {
    console.error("Error fetching notes:", error.message);
    res.status(500).send("Internal Server Error"); // Handle any errors that occur during the fetch
  }
});

// Route 2 : Add a new note using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }), // Validate the title field
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }), // Validate the description field same note no restrication 
  ],
  async (req, res) => {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // If there are errors, return a 400 status with the error messages
    }

    const { title, description, tag } = req.body; // Destructure the request body to get title, description, and tag
    try {
      const note = new Note({ title, description, tag, user: req.user.id }); // user wise notes add + Create a new note instance
      const savedNote = await note.save(); // Save the note to the database
      res.json(savedNote); // Send the saved note as a JSON response
    } catch (error) {
      console.error("Error adding note:", error.message);
      res.status(500).send("Internal Server Error"); // Handle any errors that occur during the save operation
    }
  }
);

// Route 3 : Update an existing note using: PUT "/api/notes/updatenote/:id". Login required
router.put(
  "/updatenote/:id",
  fetchuser,
  async (req, res) => {
    const { title, description, tag } = req.body; // Destructure the request body to get title, description, and tag
    const newNote = {}; // Create an object to hold the updated note data

    if (title) {
      newNote.title = title; // If title is provided, update it
    }
    if (description) {
      newNote.description = description; // If description is provided, update it
    }
    if (tag) {
      newNote.tag = tag; // If tag is provided, update it
    }

    try {
      // Find the note by ID and update it with the new data
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found"); // If note not found, return 404 status
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed"); // If user does not own the note, return 401 status
      }

      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true } // Return the updated note
      );
      res.json(note); // Send the updated note as a JSON response
    } catch (error) {
      console.error("Error updating note:", error.message);
      res.status(500).send("Internal Server Error"); // Handle any errors that occur during the update operation
    }
  }
);

// Route 4 : Delete an existing note using: DELETE "/api/notes/deletenote/:id". Login required
router.delete(
  "/deletenote/:id",
  fetchuser,
  async (req, res) => {
    try {
      // Find the note by ID
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found"); // If note not found, return 404 status
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed"); // If user does not own the note, return 401 status
      }

      // Delete the note
      note = await Note.findByIdAndDelete(req.params.id);
      res.json({ success: "Note has been deleted", note }); // Send a success message and the deleted note as a JSON response
    } catch (error) {
      console.error("Error deleting note:", error.message);
      res.status(500).send("Internal Server Error"); // Handle any errors that occur during the delete operation
    }
  }
);


// Route 1 : Fetch all notes using: POST "/api/notes/fetchallnotes". Login required
// router.post('/fetchallnotes',fetchuser, (req, res) => { //promises so .then
//     const notes = Note.find({ user: req.user.id }); // Fetch all notes for the logged-in user fetch.user comes from fetchuser middleware
//     notes.then((notes) => {
//         res.json(notes); // Send the fetched notes as a JSON response
//     }).catch((error) => {
//         console.error("Error fetching notes:", error.message);
//         res.status(500).send("Internal Server Error"); // Handle any errors that occur during the fetch
//     });

//res.send('Hello Himanshu! This is the notes route.');

module.exports = router;
