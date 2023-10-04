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
      ws.send(ws.clientId)
      ws.on("message", this.messageHandler.bind(this))
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
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message)
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
        let userIds = Array.from(this.webSocketServer.clients).map(
          (client: WebSocket & { clientId?: string }) => client.clientId
        )
        client.send(JSON.stringify(userIds))
      }
    })
  }

  //   private onMessageSend(ws: WebSocket & { clientId?: string }, message: SendMessageWSMessageDTO) {}
}
