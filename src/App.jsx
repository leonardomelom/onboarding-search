import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';
import './input.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ user: '', password: '' });

  const handleLogin = (user, password) => {
    setCredentials({ user, password });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCredentials({ user: '', password: '' });
  };

  return (
    <>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard
          user={credentials.user}
          password={credentials.password}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}

export default App;
