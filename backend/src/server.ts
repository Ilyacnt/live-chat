import * as http from "http"
import express from "express"

import WebSocket, { Server as WebSocketServer } from "ws"

import { isString } from "./gurads/isString"
import { isSendMessageWSMessageDTO } from "./gurads/isSendMessageWSMessageDTO"
import { SocketController } from "./controllers/SocketController"

const PORT: string | number = process.env.PORT || 8999
const app = express()

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  return next()
})

const server = http.createServer(app)

const webSocketServer = new WebSocketServer({ server })
const socketController = new SocketController(webSocketServer)

webSocketServer.on("error", (error) => {
  console.error("WebSocket Server Error:", error)
})

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
