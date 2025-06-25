import noteContext from './NoteContext';
import React, { useState } from 'react';

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //Get all note
  const getNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    if (response.ok) {
      console.log(json);
      setNotes(json);
    } else {
      console.error('Token Invalid:', json.error);
      setNotes([]); // prevent crash
    }
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //Api called ToDo
    //API Call
    //fetch with hearders for syntax
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }) //title:title,description:description,tag:tag object
    });
    if (!response.ok) {
      const text = await response.text();
      console.error('Server Error Response:', text);
      return;
    }
    const newNote = await response.json();
    console.log('Adding a note=>', newNote);
    if (!newNote || !newNote._id) {
      console.error('Error adding note:', newNote);
      return;
    }
    setNotes(notes.concat(newNote));
  };

  //Delete a note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json);

    //console.log("Deleting a note", id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API Call
    //fetch with hearders for syntax
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }) //body data type must watch "Content-Type" header
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes)); //copy created

    //Logic to edit in client
    //console.log("Editing a note", id);
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    //console.log(newNotes);
    setNotes(newNotes);
  };
  const togglePin = async (id, pinned) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ pinned })
    });
    const updatedNote = await response.json();
    setNotes(notes.map((note) => (note._id === id ? updatedNote : note)));
  };

  return (
    //export as value=
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, togglePin }}>
      {props.children}
    </noteContext.Provider> //send value of state and update fun as object to children
  );
};
export default NoteState;
