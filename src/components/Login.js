import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(e);
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: e.target.email.value, password: e.target.password.value })
    });
    const json = await response.json();
    //console.log("Login json",json);
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      props.showAlert('Logged In Successfully', 'success');
      navigate('/');
    } else {
      props.showAlert('Invalid Details', 'danger');
    }
  };
  return (
    <div className='mt -3'>
      <h2>Login to continue to iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            aria-describedby='emailHelp'
            placeholder='Enter email'
          />
          <small id='emailHelp' className='form-text text-muted'>
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' className='form-control' id='password' name='password' placeholder='Password' />
        </div>
        <button type='submit' className='btn btn-primary my-4'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
