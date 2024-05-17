import { WebSocketServer } from "ws";

const port = Number(process.env.PORT ?? 3000);

const wss = new WebSocketServer({
  port,
});

wss.on("connection", function (socket) {
  console.log("client connected");

  socket.on("message", function (message) {
    // no message when using bun
    console.log("message from client", message.length);
  });

  socket.on("close", function () {
    console.log("client disconnected");
  });
});

console.log(`WebSocket server is running on port ${port}`);
