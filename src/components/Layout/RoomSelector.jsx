import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomSelector = ({ onSelectRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');

  const API_URL = import.meta.env.VITE_BACKEND_URL; // Use the environment variable

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
          console.error('User not authenticated');
          return;
        }

        const token = user.token;
        const response = await axios.get(`${API_URL}/rooms`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error.response?.data || error.message);
      }
    };

    fetchRooms();
  }, [API_URL]);

  const createRoom = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.token) {
        console.error('User not authenticated');
        return;
      }

      const token = user.token;
      const response = await axios.post(
        `${API_URL}/rooms`,
        { name: newRoomName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRooms([...rooms, response.data]);
      setNewRoomName('');
    } catch (error) {
      console.error('Room creation failed:', error.response?.data || error.message);
    }
  };

  return (
    <div className="room-selector">
      <h2>Chat Rooms</h2>
      <div className="room-list">
        {rooms.map((room) => (
          <div
            key={room._id}
            onClick={() => onSelectRoom(room._id)}
            className="room-item"
          >
            {room.name}
          </div>
        ))}
      </div>
      <div className="create-room">
        <input
          type="text"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          placeholder="New Room Name"
        />
        <button onClick={createRoom}>Create Room</button>
      </div>
    </div>
  );
};

export default RoomSelector;
