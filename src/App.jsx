import React, { useState } from 'react';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import RoomSelector from './components/Layout/RoomSelector';
import ChatRoom from './components/Chat/ChatRoom';
import { logout } from './services/authService';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setSelectedRoom(null);
  };

  if (!user) {
    return (
      <div className="auth-container">
        {!showRegister ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Register 
            onRegister={() => setShowRegister(false)} 
          />
        )}
        <button onClick={() => setShowRegister(!showRegister)}>
          {showRegister ? 'Switch to Login' : 'Create an Account'}
        </button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="header">
        <span>Logged in as: {user.username}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {!selectedRoom ? (
        <RoomSelector onSelectRoom={setSelectedRoom} />
      ) : (
        <ChatRoom roomId={selectedRoom} />
      )}
    </div>
  );
}

export default App;