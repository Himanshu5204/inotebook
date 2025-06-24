import React, { useContext } from 'react'; //rafce
import noteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
  const context = useContext(noteContext); //for using context notestate.js ..one step up
  const { deleteNote } = context; //notestate context ma deletenote function add che

  const { note, updateNote } = props;
  return (
    <div className='col-md-3'>
      <div className='card my-3'>
        <div className='card-body'>
          <div className='d-flex align-items-center'>
            <h5 className='card-title'>{note.title}</h5>
            <i
              className='fa-solid fa-trash mx-2'
              onClick={() => {
                deleteNote(note._id);
                props.showAlert('Deleted Successfully', 'success');
              }}></i>
            <i
              className='fa-solid fa-pen-to-square mx-2'
              onClick={() => {
                updateNote(note);
                
              }}></i>
          </div>
          <p className='card-text'>{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
