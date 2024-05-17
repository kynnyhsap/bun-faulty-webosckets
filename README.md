# Bun WebSocket does not send binary data over to server

node v22.0.0
bun 1.1.8

I have a simple code in `ws.js`: connect to weboscket server and send over binary data from `audio.pcm` file in chunks.

```javascript
// ws.js

import fs from "fs";

const URL = "https://bun-faulty-ws.up.railway.app/";

const ws = new WebSocket(URL);

ws.addEventListener("open", async () => {
  console.log("connection opened");

  ws.addEventListener("error", (e) => console.error("connection error", e));

  ws.addEventListener("close", (e) =>
    console.log("connection closed:", e.reason),
  );

  ws.addEventListener("message", (e) => {
    console.log("message", e.data);
  });

  // read from file and send to wss
  const fileStream = fs.createReadStream("audio.pcm");

  for await (const chunk of fileStream) {
    console.log("sending chunk of size", chunk.length);
    ws.send(chunk);
  }
});
```

To run this code i use `bun run ws.js` for bun and `node ws.js` for node (v22). Since node v22 and bun have the same weboscket interface (and the same implementation as far as i can tell - uWebSockets) i expect this code to work indentically, but in case with **bun - it just refuses to send data over to weboscket server**.

You can find code of my server in `wss.js`. Important to note that it works when i run server locally, but fails if I try to asses a remote server via `wss`. I deployed my server on railway.app and you can use this url for testing: https://bun-faulty-ws.up.railway.app/

```javascript
// wss.js
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
```
