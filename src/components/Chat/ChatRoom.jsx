import React, { useState, useEffect, useCallback } from 'react';
import SocketService from '../../services/socketService';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import OnlineUsers from './OnlineUsers';

const ChatRoom = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const socket = SocketService.connect();

    SocketService.joinRoom(roomId, user.userId);
    
    SocketService.onPreviousMessages((msgs) => {
      setMessages(msgs);
    });

    SocketService.onNewMessage((msg) => {
      setMessages(prev => [...prev, msg]);
    });

    SocketService.onlineUsers((users) => {
      setOnlineUsers(users);
    });

    socket.on('userTyping', ({ username, isTyping }) => {
      setTypingUsers(prev => 
        isTyping 
          ? [...prev.filter(u => u !== username), username]
          : prev.filter(u => u !== username)
      );
    });

    return () => {
      SocketService.disconnect();
    };
  }, [roomId, user.userId]);

  const sendMessage = useCallback((text) => {
    SocketService.sendMessage(roomId, user.userId, text);
  }, [roomId, user.userId]);

  const handleTyping = useCallback((isTyping) => {
    SocketService.typing(roomId, user.userId, isTyping);
  }, [roomId, user.userId]);

  return (
    <div className="chat-room">
      <div className="chat-container">
        <MessageList messages={messages} />
        {typingUsers.length > 0 && (
          <div className="typing-indicator">
            {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
          </div>
        )}
        <MessageInput 
          onSendMessage={sendMessage} 
          onTyping={handleTyping}
        />
      </div>
      <OnlineUsers users={onlineUsers} />
    </div>
  );
};

export default ChatRoom;