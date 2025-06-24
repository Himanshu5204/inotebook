
import Notes from "./Notes";

const Home = (props) => {
  {/* <AddNote showAlert={props.showAlert}/> */}
  const {showAlert}=props;  // destructuring
  return ( 
    <div>
     {/* <AddNote/> */}
     <Notes showAlert={showAlert} search={props.search} />
    </div>
  );
};

export default Home;
