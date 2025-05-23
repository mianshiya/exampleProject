import React, { useState } from 'react';
import LoginForm from './LoginForm';
import LoginInstruction from './LoginInstruction';
import LoginSuccess from './LoginSuccess';

const LoginPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLoginSuccess = (name: string) => {
    setUsername(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="md:w-1/2 p-8">
        {isLoggedIn ? (
          <LoginSuccess username={username} onLogout={handleLogout} />
        ) : (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
      <div className="md:w-1/2 bg-blue-50 p-8">
        <LoginInstruction />
      </div>
    </div>
  );
};

export default LoginPage;