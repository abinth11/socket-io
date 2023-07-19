import { useState } from "react";
import socket from "../socket/socket";
const Join = () => {
  const [roomId, setRoomId] = useState<string>("");
  const handleJoin = () =>{
  socket.emit('join_room',roomId)
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
