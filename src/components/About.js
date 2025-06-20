import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

const About = () => {
  //const { names, age, email, address } = useContext(noteContext);
  const a = useContext(noteContext);
  return (
    <div>
      this is the About component of the inotebook app.<br/>
      <b>Name: {a.names}</b>
      <b>Age: {a.age}</b>
      <b>Email: {a.email}</b>
      <b>Address: {a.address}</b>{" "}
    </div>
  );
};

export default About;
