import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;

    if (password !== cpassword) {
      alert('Passwords do not match');
      return;
    }
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    //console.log("New user json",json);
    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem('token', json.authToken);  
      navigate('/');
      props.showAlert('Account Created Successfully', 'success');
    } else {
      props.showAlert('Invalid Credentials', 'danger');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='container mt-2'>
      <h2 className='my-3'>Create an Account to use iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group mb-2'>
          <label htmlFor='exampleInputEmail1'>Name</label>
          <input
            type='text'
            className='form-control mb-1'
            id='name'
            name='name'
            aria-describedby='emailHelp'
            onChange={onChange}
            minLength={3}
            placeholder='Enter your name'
            
          />
        </div>
        <div className='form-group mb-2'>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            className='form-control mb-1'
            id='email'
            name='email'
            aria-describedby='emailHelp'
            onChange={onChange}
            placeholder='Enter email'
            
          />
          <small id='emailHelp' className='form-text text-muted mb-3'>
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className='form-group mb-2'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='form-control'
            name='password'
            id='password'
            onChange={onChange}
            placeholder='Password'
            minLength={5}
            required
          />
        </div>
        <div className='form-group mb-3'>
          <label htmlFor='cpassword'>Confirm Password</label>
          <input
            type='password'
            name='cpassword'
            className='form-control'
            id='cpassword'
            onChange={onChange}
            minLength={5}
            placeholder='Confirm Password'
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
