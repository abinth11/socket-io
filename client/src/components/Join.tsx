import { useState } from "react";
import socket from "../socket/socket";
import {useNavigate} from 'react-router-dom'
const Join = () => {
  const [roomId, setRoomId] = useState<string>("");
  const navigate = useNavigate()
  const handleJoin = () =>{
  socket.emit('join_room',roomId)
  navigate('/chat')
  }
  return (
    <div style={{ padding: "4rem", display: "flex" }}>
      <input
        type='text'
        onChange={(e) => {
          setRoomId(e.target.value);
        }}
      />
      <button onClick={handleJoin}>join room</button>
    </div>
  );
};

export default Join;
