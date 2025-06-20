import React, { useContext ,useState} from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = () => {
     const context = useContext(noteContext); //for using context notestate.js ..one step up
      const {addNote } = context; //notestate context ma addnote function add che

      const [note, setNote] = useState({title:"",description:"",tag:"default"});

      const handleClick =(e)=>{
        e.preventDefault(); //to avoid page refresh
        addNote(note.title,note.description,note.tag);
      }

      const onChange=(e)=>{
        console.log(e.target.value);
        setNote({...note,[e.target.name]:e.target.value}); // ... note ni andar je hoy te rahe and next values add/overwrite kari dejo
      }

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="form-group">
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter title"
            onChange={onChange}
          />

        </div>
        <div className="form-group">
          <label htmlFor="description" >description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter description"
            onChange={onChange}
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
