import React, { useState, useEffect } from 'react';

const UserProfile = ({ show, handleClose, showAlert }) => {
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
        'auth-token': localStorage.getItem('token'),
      },
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
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ name: form.name }),
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

  return (
    <div className={`modal fade${show ? ' show d-block' : ''}`} tabIndex="-1" style={{ background: show ? 'rgba(0,0,0,0.5)' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">User Profile</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            {editMode ? (
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required minLength={3} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email" value={form.email} disabled />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditMode(false)}>Cancel</button>
              </form>
            ) : (
              <>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <button className="btn btn-outline-primary" onClick={() => setEditMode(true)}>Edit</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
