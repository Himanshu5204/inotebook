import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //Switch was removed in React Router v6. use Routes
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      {/* NoteState as context that is used in all below components */}
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="This is alert message"/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
      </>
  );
}

export default App;
