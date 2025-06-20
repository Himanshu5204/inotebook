import noteContext from "./NoteContext";
import React, { useState } from "react";


const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "6851944c9e2c78a315086c6e",
      user: "6851716a8797be1fd5dd5260",
      title: "My title",
      description: "please wake up late",
      tag: "personal",
      date: "2025-06-17T16:14:04.076Z",
      __v: 0,
    },
    {
      _id: "68519475e3f0c6f72f7259e9",
      user: "6851716a8797be1fd5dd5260",
      title: "My title",
      description: "please wake up late",
      tag: "personal",
      date: "2025-06-17T16:14:45.230Z",
      __v: 0,
    },
    {
      _id: "68519479e3f0c6f72f7259ec",
      user: "6851716a8797be1fd5dd5260",
      title: "My title",
      description: "please wake up late",
      tag: "personal",
      date: "2025-06-17T16:14:49.215Z",
      __v: 0,
    },
    {
      _id: "685195997df8ec22b54151e3",
      user: "6851716a8797be1fd5dd5260",
      title: "My title",
      description: "please wake up late",
      tag: "personal",
      date: "2025-06-17T16:19:38.000Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);
  return (
    <noteContext.Provider value={{notes,setNotes}}>
      {props.children}
    </noteContext.Provider> //send value of state and update fun as object to children
  );
};
export default NoteState;
