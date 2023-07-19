import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import socketConfig from "./websocket/socket";
import config from "./config";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./types/socket-types";
import { Server } from "socket.io";

const app: Application = express();
const server = http.createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "http://127.0.0.1:5173/",
    methods: ["GET", "POST"],
  },
});

socketConfig(io);

app.use(morgan("dev"));
app.use(cors());

server.listen(config.SERVER_PORT, () => {
  console.log(`server listening on port ${config.SERVER_PORT}`);
});
