import noteContext from "./NoteContext";

const NoteState = (props) => {
  return (
    <noteContext.Provider value={{}}>
        {props.children}
    </noteContext.Provider> //send value of state and update fun as object to children
  );
};
export default NoteState;
