import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className='container my-4'>
      <h2>About iNotebook 📝</h2>
      <p>
        <strong>iNotebook</strong> is a secure, cloud-based note-taking application built using the MERN stack (MongoDB,
        Express.js, React, Node.js). It helps you organize your thoughts, ideas, and tasks with ease — accessible
        anytime, anywhere.
      </p>

      <h4>✨ Features</h4>
      <ul>
        <li>Create, edit, and delete notes in real-time</li>
        <li>Tag your notes for better organization</li>
        <li>Search notes instantly by title</li>
        <li>Light/Dark theme toggle for better usability</li>
        <li>User authentication with JWT for secure access</li>
        <li>Change password and edit profile</li>
      </ul>

      <h4>🔐 Your Privacy Matters</h4>
      <p>
        iNotebook stores your data securely in the cloud. Only you can view and manage your notes after logging in with
        your credentials. All routes are protected using authentication tokens.
      </p>

      <h4>🚀 How to Use</h4>
      <ol>
        <li>Signup or login with your email</li>
        <li>Create new notes with a title, description, and optional tag</li>
        <li>Use the search bar to quickly find your notes</li>
        <li>Edit or delete notes when needed</li>
        <li>Use the profile icon to manage your account or logout</li>
      </ol>
      <p className='footer-text'>Built with ❤️ by Himanshu Prajapati.</p>
    </div>
  );
};

export default About;
