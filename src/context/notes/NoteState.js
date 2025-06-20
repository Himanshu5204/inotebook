import { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  const s1 = {
    names: "himanshu",
    age: 25,
    email: "himanshu@gmail.com",
    address: "bangalore",
    // notes: props.notes,
    // setNotes: props.setNotes,
  };
  const [state, setState] = useState(s1); //state default vlue is s1 and setState is function to update value 
  const update = () => {
    setTimeout(() => {
      setState({
        names: "rajesh",
        age: 21,
        email: "anshu@gmail.com",
        address: "galore",
      });
    }, 1000);
  };
  return (
    <noteContext.Provider value={{state,update}}>{props.children}</noteContext.Provider> //send value of state and update fun as object to children
  );
};
export default NoteState;
