import React, { useEffect, useContext, useRef, useState } from 'react';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import noteContext from '../context/notes/NoteContext';

const Notes = () => {
  const context = useContext(noteContext); //for using context notestate.js ..one step up
  const { notes, getNotes } = context;
  useEffect(() => {
    //used as componentDidMount
    getNotes();
    // eslint-disable-next-line
  }, []); // one time fetch []

  const [note, setNote] = useState({ title: '', description: '', tag: '' });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  };

  const ref = useRef(null);


  const handleClick = (e) => {
    console.log('Updating a note',note);
    e.preventDefault(); //to avoid page refresh
  };

  const onChange = (e) => {
    console.log(e.target.value);
    setNote({ ...note, [e.target.name]: e.target.value }); // ... note ni andar je hoy te rahe and next values add/overwrite kari dejo
  };

  return (
    <>
      <AddNote />
      <button type='button' className='btn btn-primary d-none' data-bs-toggle='modal' ref={ref} data-bs-target='#exampleModal'>
        Launch demo modal
      </button>
      <div className='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Edit Note
              </h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <form className='my-3'>
                <div className='form-group'>
                  <label htmlFor='title'>title</label>
                  <input
                    type='text'
                    id='etitle'
                    name='etitle'
                    value={note.etitle}
                    className='form-control'
                    aria-describedby='emailHelp'
                    placeholder='Enter title'
                    onChange={onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='description'>description</label>
                  <input
                    type='text'
                    className='form-control'
                    value={note.edescription}
                    id='edescription'
                    name='edescription'
                    placeholder='Enter description'
                    onChange={onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='description'>tag</label>
                  <input
                    type='text'
                    className='form-control'
                    value={note.etag}
                    id='etag'
                    name='etag'
                    placeholder='Enter tag'
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                Close
              </button>
              <button type='button' className='btn btn-primary' onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your a Note</h2>
        {notes.map((note) => {
          return <NoteItem note={note} key={note._id} updateNote={updateNote} />;
        })}
      </div>
    </>
  );
};

export default Notes;
