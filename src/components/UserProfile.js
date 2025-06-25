import React, { useState, useEffect } from 'react';
import { Link,useNavigate} from 'react-router-dom';

const UserProfile = ({ show, handleClose, showAlert }) => {
  let navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '' });
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });

  useEffect(() => {
    if (show) fetchUser();
    // eslint-disable-next-line
  }, [show]);

  const fetchUser = async () => {
    const res = await fetch('http://localhost:5000/api/auth/getuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const data = await res.json();
    setUser({ name: data.name, email: data.email });
    setForm({ name: data.name, email: data.email });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Call backend to update user (route to be implemented)
    const res = await fetch('http://localhost:5000/api/auth/updateuser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ name: form.name })
    });
    const data = await res.json();
    if (res.ok) {
      setUser({ ...user, name: form.name });
      setEditMode(false);
      showAlert('Profile updated successfully', 'success');
    } else {
      showAlert(data.error || 'Update failed', 'danger');
    }
  };

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' });
  return (
    <div
      className={`modal fade${show ? ' show d-block' : ''}`}
      tabIndex='-1'
      style={{ background: show ? 'rgba(0,0,0,0.5)' : 'none' }}>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>User Profile</h5>
            <button type='button' className='btn-close' onClick={handleClose}></button>
          </div>
          <div className='modal-body'>
            {editMode ? (
              <form onSubmit={handleUpdate}>
                <div className='mb-3'>
                  <label className='form-label'>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    required
                    minLength={3}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Email</label>
                  <input type='email' className='form-control' name='email' value={form.email} disabled />
                </div>
                <button type='submit' className='btn btn-primary'>
                  Save
                </button>
                <button type='button' className='btn btn-secondary ms-2' onClick={() => setEditMode(false)}>
                  Cancel
                </button>
              </form>
            ) : showChangePassword ? (
              // <-- Place your change password form code here
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const res = await fetch('http://localhost:5000/api/auth/changepassword', {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      'auth-token': localStorage.getItem('token')
                    },
                    body: JSON.stringify(passwordForm)
                  });
                  const data = await res.json();
                  if (res.ok) {
                    showAlert('Password changed successfully', 'success');
                    setShowChangePassword(false);
                    setPasswordForm({ currentPassword: '', newPassword: '' });
                  } else {
                    showAlert(data.error || 'Password change failed', 'danger');
                  }
                }}>
                <div className='mb-2'>
                  <label className='form-label'>Current Password</label>
                  <input
                    type='password'
                    className='form-control'
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    required
                  />
                </div>
                <div className='mb-2'>
                  <label className='form-label'>New Password</label>
                  <input
                    type='password'
                    className='form-control'
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    required
                    minLength={5}
                  />
                </div>
                <button type='submit' className='btn btn-success me-2'>
                  Save
                </button>
                <button type='button' className='btn btn-secondary' onClick={() => setShowChangePassword(false)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <button className='btn btn-outline-primary me-2' onClick={() => setEditMode(true)}>
                  Edit
                </button>
                <button className='btn btn-warning me-2' onClick={() => setShowChangePassword(true)}>
                  Change Password
                </button>
                <Link
                  className='btn btn-danger'
                  onClick={() => {
                    localStorage.removeItem('token');
                    showAlert('Logged out successfully', 'success');
                    handleClose();
                    //window.location.reload(); // or use navigate('/login') if you want to redirect
                    navigate('/login') 
                  }}>
                  Logout
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
