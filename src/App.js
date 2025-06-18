import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"; //Switch was removed in React Router v6. use Routes 
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";

function App() {
  return (
    <>
      <Router>
      <Navbar />
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
    </Router>


      <footer className="text-center mt-5">
        <p>© 2025 iNotebook. All rights reserved.</p>
      </footer>
      <style jsx>{`
        footer {
          background-color: #f8f9fa;
          padding: 20px;
          position: fixed;
          width: 100%;
          bottom: 0;
        }
      `}</style>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      />
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/js/bootstrap.bundle.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.production.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/5.2.0/react-router-dom.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/1.4.0/react-bootstrap.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/1.4.0/react-bootstrap.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/1.4.0/react-bootstrap.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/1.4.0/react-bootstrap.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/1.4.0/react-bootstrap.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/1.4.0/react-bootstrap.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/1.4.0/react-bootstrap.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/1.4.0/react-bootstrap.min.js"></script>
    </>
  );
}

export default App;
