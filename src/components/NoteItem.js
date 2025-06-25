import React, { useContext } from 'react'; //rafce
import noteContext from '../context/notes/NoteContext';
import { FaThumbtack } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

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
            <button
              onClick={() => props.togglePin(note._id, !note.pinned)}
              className='btn btn-link p-0 mx-1'
              title={note.pinned ? 'Unpin' : 'Pin'}
              style={{ color: note.pinned ? '#b00505' : '#888', transform: note.pinned ? 'rotate(-45deg)' : 'none' }}>
              <FaThumbtack />
            </button>
            {/* Export as Text */}
            <button
              className='btn btn-sm btn-outline-secondary mx-1'
              onClick={() => {
                const blob = new Blob([`Title: ${note.title}\n\n${note.description}`], {
                  type: 'text/plain;charset=utf-8'
                });
                saveAs(blob, `${note.title}.txt`);
              }}
              title='Export as Text'>
              TXT
            </button>

            {/* Export as PDF */}
            <button
              className='btn btn-sm btn-outline-danger mx-1'
              onClick={() => {
                const doc = new jsPDF();
                doc.text(`Title: ${note.title}\n\n${note.description}`, 10, 10);
                doc.save(`${note.title}.pdf`);
              }}
              title='Export as PDF'>
              PDF
            </button>
          </div>
          <p className='card-text'>{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
