import WebSocket, { Server as WebSocketServer } from "ws"
import { v4 as uuid } from "uuid"
import { GetUsersWSMessageDTO, SendMessageWSMessageDTO } from "../dto/WSMessageDTO"
import { isWSMessageDTO } from "../gurads/isWSMessageDTO"
import { MessageTypes } from "../types/MessageTypes"

export class SocketController {
  constructor(private webSocketServer: WebSocketServer) {
    this.listenConnection()
  }

  private listenConnection(): void {
    this.webSocketServer.on("connection", (ws: WebSocket & { clientId?: string }) => {
      ws.clientId = uuid()
      ws.send(
        JSON.stringify({
          type: MessageTypes.USER_SET,
          userId: ws.clientId,
        })
      )
      ws.on("message", this.messageHandler.bind(this))

      this.webSocketServer.clients.forEach((client: WebSocket & { clientId?: string }) => {
        client.clientId &&
          this.getUsers({
            type: MessageTypes.USERS_GET,
            user: { userId: client.clientId },
          } as GetUsersWSMessageDTO)
      })
    })

    this.webSocketServer.on("close", (ws: WebSocket & { clientId?: string }) => {
      console.log("CLOSE")

      this.webSocketServer.clients.forEach((client: WebSocket & { clientId?: string }) => {
        client.clientId &&
          this.getUsers({
            type: MessageTypes.USERS_GET,
            user: { userId: client.clientId },
          } as GetUsersWSMessageDTO)
      })
    })
  }

  private messageHandler(messageRaw: unknown): void {
    try {
      let message = JSON.parse(messageRaw as string)

      if (isWSMessageDTO(message)) {
        switch (message.type) {
          case MessageTypes.MESSAGE_SEND:
            this.sendMessage(message as SendMessageWSMessageDTO)
            break
          case MessageTypes.USERS_GET:
            this.getUsers(message as GetUsersWSMessageDTO)
            break
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error)
      }
    }
  }

  private sendMessage(message: SendMessageWSMessageDTO): void {
    this.webSocketServer.clients.forEach((client: WebSocket & { clientId?: string }) => {
      if (client.clientId && message.receivers.includes(client.clientId)) {
        client.send(JSON.stringify(message))
      }
    })
  }

  private getUsers(message: GetUsersWSMessageDTO): void {
    this.webSocketServer.clients.forEach((client: WebSocket & { clientId?: string }) => {
      if (client.clientId === message.user.userId) {
        let userIds = Array.from(this.webSocketServer.clients)
          .filter(
            (client: WebSocket & { clientId?: string }) => client.clientId !== message.user.userId
          )
          .map((client: WebSocket & { clientId?: string }) => ({
            userId: client.clientId,
          }))

        client.send(JSON.stringify({ type: MessageTypes.USERS_GET, userIds }))
      }
    })
  }
}
