import { useEffect } from "react";
import "./App.css";
import {Outlet} from 'react-router-dom'
import socket from "./socket/socket";

function App() {

  useEffect(() => {
    // Event listeners
    socket.connect();

    // Cleanup function
    return () => {
      socket.disconnect(); // Disconnect the socket when the component unmounts
    };
  }, []);
  return (
    <div className='app'>
      <Outlet/>
    </div>
  );
}

export default App;
