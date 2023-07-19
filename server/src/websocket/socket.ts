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
      // sendProgress();
      socket.on("request_data", () => {
        // Process your data retrieval logic here
        const data = { message: "Hello from the server!" };

        // Emit a custom event with the data
        socket.emit("response_data", data);
      });

      socket.on("join_room", (courseId: string) => {
        socket.join(courseId);
        console.log(`User ${socket.id} joined room ${courseId}`);
      });

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    }
  );
};

export default socketConfig;
