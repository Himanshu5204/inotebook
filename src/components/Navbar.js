import React, { useEffect } from 'react'; //rafce react arrow function component export
import { Link, useLocation , useNavigate } from 'react-router-dom';

const Navbar = (props) => {
   let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    props.showAlert('Logged out successfully', 'success');
    navigate('/login');
  }
  let location = useLocation();
  useEffect(() => {
    //console.log(location);
  }, [location]); //when change location this useEffect will run see console pathname is chnaged
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
          {location.pathname !== '/login' && location.pathname !== '/signup' && (
            <form className='d-flex'>
              <input className='form-control mx-1' type='search' placeholder='Search' aria-label='Search' />
              <button className='btn btn-outline-success mx-3' type='submit'>
                Search
              </button>
            </form>
          )}
          {!localStorage.getItem('token') ? (
            <form className='d-flex'>
              <Link className='btn btn-primary mx-2' to='/login' role='button'>
                Login
              </Link>
              <Link className='btn btn-primary ' to='/signup' role='button'>
                Signup
              </Link>
            </form>
          ) : (
            <button className='btn btn-primary ' onClick={handleLogout} >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
