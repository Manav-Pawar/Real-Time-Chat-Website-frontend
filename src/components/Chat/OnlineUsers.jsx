import React from 'react';

const OnlineUsers = ({ users }) => {
  return (
    <div className="online-users">
      <h3>Online Users</h3>
      {users.map(user => (
        <div key={user} className="user-item">{user}</div>
      ))}
    </div>
  );
};

export default OnlineUsers;