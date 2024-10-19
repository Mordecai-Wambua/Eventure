import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';
import App from './App.jsx';
import './index.css';

// Create the store
const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

const root = createRoot(document.getElementById('root'));

root.render(
  <AuthProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);