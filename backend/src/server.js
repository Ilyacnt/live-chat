const http = require("http");
const express = require("express");
const WebSocket = require("ws");

const PORT = process.env.PORT || 8999;
const app = express();

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on("connection", (ws) => {
  ws.id = Date.now();

  ws.on("message", (m) => {
    const message = JSON.parse(m);

    // console.log(message);

    webSocketServer.clients.forEach((client) => {
      console.log(client.id);
      if (client.id !== ws.id) {
        client.send(m);
      }
    });
  });

  ws.on("error", (e) => ws.send(e));

  ws.send("Hi there, I am a WebSocket server");
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
