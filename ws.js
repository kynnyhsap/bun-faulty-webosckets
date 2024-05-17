import fs from "fs";

// this is my deployed server url
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
