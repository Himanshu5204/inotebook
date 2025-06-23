import noteContext from "./NoteContext";
import React, { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

  //Get all note
  const getNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg1MTcxNmE4Nzk3YmUxZmQ1ZGQ1MjYwIn0sImlhdCI6MTc1MDE3MjE5M30.3z1-uB13t9YVvO8SI9zpCidYNLhfzzFHh5Oxwk5wLG8",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }

  //Add a note
  const addNote = async(title, description, tag) => {
    //Api called ToDo
    //API Call
    //fetch with hearders for syntax
    const response = await fetch(
      `${host}/api/notes/addnote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg1MTcxNmE4Nzk3YmUxZmQ1ZGQ1MjYwIn0sImlhdCI6MTc1MDE3MjE5M30.3z1-uB13t9YVvO8SI9zpCidYNLhfzzFHh5Oxwk5wLG8",
        },
      body: JSON.stringify({title,description,tag}), //title:title,description:description,tag:tag object
      }
    );
    const note = await response.json();
    setNotes(notes.concat(note)); //to add new note
    //console.log(note);
  };

  //Delete a note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(
      `${host}/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg1MTcxNmE4Nzk3YmUxZmQ1ZGQ1MjYwIn0sImlhdCI6MTc1MDE3MjE5M30.3z1-uB13t9YVvO8SI9zpCidYNLhfzzFHh5Oxwk5wLG8",
        },
      }
    );
    const json = await response.json();
    //console.log(json);

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
    const response = await fetch(
      `${host}/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg1MTcxNmE4Nzk3YmUxZmQ1ZGQ1MjYwIn0sImlhdCI6MTc1MDE3MjE5M30.3z1-uB13t9YVvO8SI9zpCidYNLhfzzFHh5Oxwk5wLG8",
        },
        body: JSON.stringify({title,description,tag}), //body data type must watch "Content-Type" header
      }
    );
    const json = await response.json();
    //console.log(json);

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

  // const editNote = (id, title, description, tag) => {
  //   const newNotes = notes.filter((note) => {
  //     return note._id !== id;
  //   });
  //   const note = {
  //     _id: "685195997df8ec22b54151e3",
  //     user: "6851716a8797be1fd5dd5260",
  //     title: title,
  //     description: description,
  //     tag: tag,
  //     date: "2025-06-17T16:19:38.000Z",
  //     __v: 0,
  //   };
  //   setNotes(newNotes.concat(note));
  // }

  return (
    //export as value=
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes}}> 
      {props.children}
    </noteContext.Provider> //send value of state and update fun as object to children
  );
};
export default NoteState;
