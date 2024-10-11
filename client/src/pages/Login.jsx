import React, { useState } from 'react';
import '../styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('http://localhost:5000/api/organizer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed!');
      }

      // Store token based on remember me option
      if (remember) {
        localStorage.setItem('token', data.token); // Store token in localStorage for persistence
      } else {
        sessionStorage.setItem('token', data.token); // Store in sessionStorage if not remembering
      }

      // Redirect to homepage
      window.location.href = '/homepage/index.html';
      
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='wrapper'>
      <div className='login-box'>
        <div className='login-header'>
          <span>Login</span>
        </div>
        {error && <p className='error-message'>{error}</p>} {/* Display error */}
        <form id='loginForm' onSubmit={handleSubmit}>
          <div className='input_box'>
            <input 
              type='email' 
              id='email' 
              className='input-field' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <label htmlFor='email' className='label'>
              Email
            </label>
            <i className='bx bx-user icon'></i>
          </div>
          <div className='input_box'>
            <input 
              type='password' 
              id='password' 
              className='input-field' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <label htmlFor='password' className='label'>
              Password
            </label>
            <i className='bx bx-lock-alt icon'></i>
          </div>
          <div className='remember-forgot'>
            <div className='remember-me'>
              <input 
                type='checkbox' 
                id='remember' 
                checked={remember} 
                onChange={(e) => setRemember(e.target.checked)} 
              />
              <label htmlFor='remember'> Remember me </label>
            </div>
            <div className='forgot'>
              <a href='#'>Forgot password?</a>
            </div>
          </div>
          <div className='input_box'>
            <input type='submit' className='input-submit' value='Login' />
          </div>
          <div className='register'>
            <span>
              Don't have an account? <a href='#'>Register</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
