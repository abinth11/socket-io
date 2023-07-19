import { Server, Socket } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../types/socket-types";

const socketConfig = (
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
) => {
  const socketRoomMap = new Map<Socket, string>(); // Create a Map to store socket-room mappings

  io.on(
    "connection",
    (
      socket: Socket<
        ClientToServerEvents,
        ServerToClientEvents,
        InterServerEvents,
        SocketData
      >
    ) => {
      console.log(`User connected: ${socket.id}`);

      socket.on("request_data", () => {
        const data = { message: "Hello from the server!" };
        socket.emit("response_data", data);
      });

      socket.on("send_message", (data) => {
        console.log(data);
        const roomId = socketRoomMap.get(socket); // Retrieve the room ID from the Map
        if (roomId) {
          io.to(roomId).emit("receive_message", data); // Broadcast the message to all sockets in the room
        }
      });

      socket.on("join_room", (roomId: string) => {
        socket.join(roomId);
        socketRoomMap.set(socket, roomId); // Store the room ID in the Map
        console.log(`User ${socket.id} joined room ${roomId}`);
      });

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        socketRoomMap.delete(socket); // Remove the socket from the Map upon disconnection
      });
    }
  );
};

export default socketConfig;
