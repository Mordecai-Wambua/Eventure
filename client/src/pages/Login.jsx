import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkExistingToken = () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        navigate('/organizer');
      }
    };

    checkExistingToken();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

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
        localStorage.setItem('token', data.token);
      } else {
        sessionStorage.setItem('token', data.token);
      }

      // Redirect to the organizer dashboard after successful login
      navigate('/organizer');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='wrapper'>
      <div className='login-box'>
        <div className='login-header'>
          <span>Login</span>
        </div>
        {error && <p className='error-message'>{error}</p>}
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
            <label htmlFor='email' className='label'>Email</label>
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
            <label htmlFor='password' className='label'>Password</label>
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
              <a href='/forgot-password'>Forgot password?</a>
            </div>
          </div>
          <div className='input_box'>
            <input 
              type='submit' 
              className='input-submit' 
              value={isLoading ? 'Logging in...' : 'Login'} 
              disabled={isLoading} 
            />
          </div>
          <div className='register'>
            <span>
              Don&apos;t have an account? <a href='/register'>Register</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;