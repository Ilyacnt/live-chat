import { MessageTypes } from "../types/MessageTypes"

export interface WSMessageDTO {
  type: MessageTypes
  userId: number
}

export interface SendMessageWSMessageDTO extends WSMessageDTO {
  type: MessageTypes.MESSAGE_SEND
  text: string
  timestamp: number
  receivers: WSMessageDTO["userId"][]
}
