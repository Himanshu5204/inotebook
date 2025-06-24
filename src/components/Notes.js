import React, { useEffect, useContext, useRef, useState } from 'react';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import noteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext); //for using context notestate.js ..one step up
  const { notes, getNotes, editNote } = context;
  let navigate = useNavigate();
  //used as componentDidMount
  useEffect(() => {
    //if token exist then only fetch notes
    //console.log("localStorage.getItem('token')",localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
      getNotes();
      // eslint-disable-next-line
    } else {
      navigate('/login');
      // eslint-disable-next-line
    }
  }, []); // one time fetch []

  useEffect(() => {
    const trimmedSearch = props.search.trim().toLowerCase();
    if (trimmedSearch === '') {
      setFiltered(notes); // Show all notes when search is cleared
    } else {
      const result = notes.filter((note) => note.title.toLowerCase().includes(trimmedSearch));

      setFiltered(result); // Show matched notes only
    }
  }, [props.search, notes]);

  const [filtered, setFiltered] = useState(notes);

  const [note, setNote] = useState({ title: '', description: '', tag: '' });
  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });
  };

  const handleClick = (e) => {
    //console.log('Updating a note',note);
    // e.preventDefault(); //to avoid page refresh not need here bcz update node button is not part here
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click(); //update per click button close
    props.showAlert('Updated Successfully', 'success');
  };

  const onChange = (e) => {
    //console.log(e.target.value);
    setNote({ ...note, [e.target.name]: e.target.value }); // ... note ni andar je hoy te rahe and next values add/overwrite kari dejo
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        type='button'
        className='btn btn-primary d-none'
        data-bs-toggle='modal'
        ref={ref}
        data-bs-target='#exampleModal'>
        Launch demo modal
      </button>
      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
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
                    minLength={5}
                    required
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
                    minLength={5}
                    required
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
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button type='button' ref={refClose} className='btn btn-secondary' data-bs-dismiss='modal'>
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
        {filtered.length === 0 ? (
          <div className='container my-3 text-danger'>No matching notes found.</div>
        ) : (
          filtered.map((note) => (
            <NoteItem note={note} key={note._id} updateNote={updateNote} showAlert={props.showAlert} />
          ))
        )}
      </div>
    </>
  );
};

export default Notes;
