import * as http from "http"
import express from "express"
import WebSocket, { Server as WebSocketServer } from "ws"

import { isString } from "./gurads/isString"
import { SendMessageWSMessageDTO } from "./dto/WSMessageDTO"
import { isWSMessageDTO } from "./gurads/isWSMessageDTO"

const PORT: string | number = process.env.PORT || 8999
const app = express()

const server = http.createServer(app)

const webSocketServer = new WebSocketServer({ server })

webSocketServer.on("connection", (ws: WebSocket & { id: number }) => {
  ws.id = Date.now()

  ws.on("message", (message: unknown) => {
    console.log(message)

    if (isString(message)) {
      const msg = JSON.parse(message)

      if (isWSMessageDTO(msg)) {
        console.log("DTO VALID")
      } else {
        console.log("DTO INVALID")
      }

      webSocketServer.clients.forEach((client: WebSocket) => {
        client.send(JSON.stringify(msg))
      })
    }
  })

  ws.on("error", (e) => ws.send(e))

  ws.send("Hi there, I am a WebSocket server")
})

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
