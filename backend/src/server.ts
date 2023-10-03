import * as http from "http"
import express from "express"
import { v4 as uuid } from "uuid"
import WebSocket, { Server as WebSocketServer } from "ws"

import { isString } from "./gurads/isString"
import { isSendMessageWSMessageDTO } from "./gurads/isSendMessageWSMessageDTO"

const PORT: string | number = process.env.PORT || 8999
const app = express()

const server = http.createServer(app)

const webSocketServer = new WebSocketServer({ server })

webSocketServer.on("connection", (ws: WebSocket & { clientId?: string }) => {
  ws.clientId = uuid()

  ws.on("message", (message: unknown) => {
    if (isString(message)) {
      const msg = JSON.parse(message)

      console.log(msg)

      if (isSendMessageWSMessageDTO(msg)) {
        webSocketServer.clients.forEach((client: WebSocket & { clientId?: string }) => {
          console.log(client.clientId)

          if (client.clientId && msg.receivers.includes(client.clientId)) {
            client.send(JSON.stringify(msg))
          }
        })

        console.log("DTO VALID")
      } else {
        console.log("DTO INVALID")
      }
    }
  })

  ws.on("error", (e) => ws.send(e))

  ws.send(`Your clientId is ${ws.clientId}`)
})

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
