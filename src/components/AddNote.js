import React, { useContext ,useState} from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
     const context = useContext(noteContext); //for using context notestate.js ..one step up
      const {addNote } = context; //notestate context ma addnote function add che

      const [note, setNote] = useState({title:"",description:"",tag:""});

      const handleClick =(e)=>{
        e.preventDefault(); //to avoid page refresh
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        props.showAlert("Added Successfully","success");
      }

      const onChange=(e)=>{
        //console.log(e.target.value);
        setNote({...note,[e.target.name]:e.target.value}); // ... note ni andar je hoy te rahe and next values add/overwrite kari dejo
      }

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3" type="submit">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={note.title}
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter title"
            onChange={onChange}
            minLength={5} required
          />

        </div>
        <div className="form-group">
          <label htmlFor="description" >Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            placeholder="Enter description"
            onChange={onChange}
            minLength={5} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" >Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            value={note.tag}
            name="tag"
            placeholder="Enter tag"
            onChange={onChange}
            minLength={5} required
          />
        </div>
        <button type="submit" className="btn btn-primary my-3" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
