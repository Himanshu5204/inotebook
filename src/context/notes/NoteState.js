import { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) =>{
    const s1 = {
        "names" : "himanshu",
        "age" : 25,
        "email" : "himanshu@gmail.com",
        "address" : "bangalore"
        // notes: props.notes,
        // setNotes: props.setNotes,
    }
    //const 
    return(
        <noteContext.Provider value={s1}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;

