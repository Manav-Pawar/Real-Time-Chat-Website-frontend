import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map(msg => (
        <div key={msg._id} className="message-item">
          <strong>{msg.user.username}: </strong>
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default MessageList;