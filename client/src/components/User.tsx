import React, { useEffect, useState } from "react";
import socket from "../socket/socket"; // Import the Socket.IO connection

const User: React.FC = () => {
    const [message,setMessage]=useState<string>("")

    const handleSendMessage = ()=>{
        socket.emit("send_message",message)

    }
  useEffect(() => {
    // Event listeners
    socket.connect();

    // // Error event listener
    // socket.on("connect_error", (error: Error) => {
    //   console.log("Socket.IO connection error:", error);
    // });

    // Cleanup function
    return () => {
      socket.disconnect(); // Disconnect the socket when the component unmounts
    };
  }, []);

  return (
    <div >
      <div style={{ padding: "4rem",display:"flex" }}>
        <input type='text'onChange={(e)=>{
            setMessage(e.target.value)
        }} /> 
        <button onClick={handleSendMessage}>send</button>
      </div>
    
    </div>
  );
};

export default User;
