import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  useSignIn  from 'react-auth-kit/hooks/useSignIn';
import '../styles/login.css';
import { ChevronLeft } from 'lucide-react';

const Login = () => {
  const apiLink = import.meta.env.VITE_SERVER_API;
  const [formData, setFormData] = useState({ email: '', password: '', remember: false });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    try {
      const response = await fetch(`${apiLink}/api/organizer/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) throw new Error(data.message || 'Login failed!');

  
      if (!data.token) {
        throw new Error('No token received from server');
      }
  
      const isAuthenticated = signIn({
        auth: {
          token: data.token,
          type: 'Bearer'
        },
        userState: { email: formData.email },
      });
  
      if (isAuthenticated) {
        navigate('/organizer');
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
   
   <div className='wrapper'>
     <div className='chevron-container'>
        <ChevronLeft onClick={() => navigate('/')} className='chevron-icon' />
      </div>
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
              name='email'
              className='input-field'
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor='email' className='label'>Email</label>
            <i className='bx bx-user icon'></i>
          </div>
          <div className='input_box'>
            <input
              type='password'
              id='password'
              name='password'
              className='input-field'
              value={formData.password}
              onChange={handleChange}
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
                name='remember'
                checked={formData.remember}
                onChange={handleChange}
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
            <span>Don&apos;t have an account? <a href='/register'>Register</a></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
