import { WebSocketServer } from "ws";

const wss = new WebSocketServer({
  port: { port: Number(process.env.PORT ?? 3000) },
});

wss.on("connection", function (socket) {
  console.log("Client connected to the server.");

  socket.on("message", function (message) {
    console.log("Received message from client:", message.length);
  });

  socket.on("close", function () {
    console.log("Client disconnected.");
  });
});

console.log("WebSocket server is running on port 3000.");
