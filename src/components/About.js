import React, { useContext , useEffect} from "react";
import noteContext from "../context/notes/NoteContext";

const About = () => {
  //const { names, age, email, address } = useContext(noteContext);
  const a = useContext(noteContext);

  //used as componentDidMount
  useEffect(() => {
    a.update();
    // eslint-disable-next-line 
  },[]);
  return (
    <div>
      {/* we puts names etc inside state as default value */}
      this is the About component of the inotebook app.<br/>
      <b>Name: {a.state.names}</b> 
      <b>Age: {a.state.age}</b>
      <b>Email: {a.state.email}</b>
      <b>Address: {a.state.address}</b> 
    </div>
  );
};

export default About;
