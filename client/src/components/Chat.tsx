import React, { useState, useEffect } from "react";
import socket from "../socket/socket"; // Import the Socket.IO connection

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [chats, setChats] = useState<Array<string>>([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChats((prevChats) => [...prevChats, data]);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("receive_message");
    };
  }, []);

  const handleSendMessage = () => {
    socket.emit("send_message", message);
  };

  return (
    <div>
      <div>
        <ul style={{listStyle:"none"}}>
          {chats.map((chat, index) => (
            <li key={index}>{chat}</li>
          ))}
        </ul>
      </div>
      <div style={{ padding: "4rem", display: "flex" }}>
        <input
          type="text"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button onClick={handleSendMessage}>send</button>
      </div>
    </div>
  );
};

export default Chat;
