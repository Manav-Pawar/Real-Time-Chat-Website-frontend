import io from 'socket.io-client';

class SocketService {
  socket = null;

  connect() {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL.replace('/api', ''); // Remove `/api` for Socket.IO
    this.socket = io(BACKEND_URL);
    return this.socket;
  }

  joinRoom(roomId, userId) {
    this.socket.emit('joinRoom', { roomId, userId });
  }

  sendMessage(roomId, userId, text) {
    this.socket.emit('chatMessage', { roomId, userId, text });
  }

  onNewMessage(callback) {
    this.socket.on('newMessage', callback);
  }

  onPreviousMessages(callback) {
    this.socket.on('previousMessages', callback);
  }

  onlineUsers(callback) {
    this.socket.on('onlineUsers', callback);
  }

  typing(roomId, userId, isTyping) {
    this.socket.emit('typing', { roomId, userId, isTyping });
  }

  disconnect() {
    if (this.socket) this.socket.disconnect();
  }
}

export default new SocketService();
