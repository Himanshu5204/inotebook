import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Notes from './Notes';

const Home = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]); // Add navigate to the dependency array

  return (
    <div>
      <Notes showAlert={props.showAlert} search={props.search} />
    </div>
  );
};

export default Home;
