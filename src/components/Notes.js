import React,{ useEffect,useContext} from "react";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import noteContext from "../context/notes/NoteContext";


const Notes = () => {
     const context = useContext(noteContext); //for using context notestate.js ..one step up
      const {notes,getNotes } = context;
      useEffect(() => {
        getNotes();
      },[]); // one time fetch []
  return (
    <>
    <AddNote/>
    <div className="row my-3">
      <h2>Your a Note</h2>
      {notes.map((note) => {
        return <NoteItem note={note} key={note._id}/>
      })}
    </div>
    </>
  );
};

export default Notes;
