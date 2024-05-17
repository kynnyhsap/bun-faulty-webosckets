import fs from "fs";

const URL = "https://bun-faulty-ws.up.railway.app/"; // or any other remote wss

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
  const fileStream = fs.createReadStream("bun.lockb");

  for await (const chunk of fileStream) {
    console.log("sending chunk of size", chunk.length);
    ws.send(chunk);
  }
});
