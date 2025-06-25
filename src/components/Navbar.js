import React, { useEffect, useState } from 'react'; //rafce react arrow function component export
import { Link, useLocation} from 'react-router-dom';
import UserProfile from './UserProfile';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = (props) => {
  //let navigate = useNavigate();
  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   props.showAlert('Logged out successfully', 'success');
  //   navigate('/login');
  // };

  let location = useLocation();
  useEffect(() => {
    //console.log(location);
  }, [location]); //when change location this useEffect will run see console pathname is chnaged

  // Add search input handler
  const handleSearchChange = (e) => {
    props.setSearch(e.target.value);
  };

  const [showProfile, setShowProfile] = useState(false);

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark';
    localStorage.setItem('theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          iNoteBook
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current='page' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to='/about'>
                About
              </Link>
            </li>
          </ul>
          <button
            className={`btn btn-${theme === 'dark' ? 'light' : 'dark'} mx-2`}
            onClick={toggleTheme}
            title='Toggle theme'>
            {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
          </button>
          {location.pathname !== '/login' && location.pathname !== '/signup' && (
            <form className='d-flex'>
              <input
                className='form-control mx-1'
                type='search'
                placeholder='Search'
                aria-label='Search'
                value={props.search}
                onChange={handleSearchChange}
              />
              <Link className='btn btn-outline-success mx-3' type='submit' to='/'>
                Search
              </Link>
            </form>
          )}
          {localStorage.getItem('token') && (
            <button
              className='btn btn-link text-light me-2 p-0'
              style={{ fontSize: '2rem', verticalAlign: 'middle' }}
              onClick={() => setShowProfile(true)}
              title='Profile'>
              <FaUserCircle />
            </button>
          )}
          {!localStorage.getItem('token') && (
            <form className='d-flex'>
              <Link className='btn btn-primary mx-2' to='/login' role='button'>
                Login
              </Link>
              <Link className='btn btn-primary ' to='/signup' role='button'>
                Signup
              </Link>
            </form>
          )}
        </div>
      </div>
      <UserProfile show={showProfile} handleClose={() => setShowProfile(false)} showAlert={props.showAlert} />
    </nav>
  );
};

export default Navbar;
