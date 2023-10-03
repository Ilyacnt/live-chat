import { MessageTypes } from "../types/MessageTypes"

export interface UserDTO {
  userId: string
  username: string
}

export interface WSMessageDTO {
  type: MessageTypes
  user: UserDTO
}

export interface SendMessageWSMessageDTO extends WSMessageDTO {
  type: MessageTypes.MESSAGE_SEND
  text: string
  timestamp: number
  receivers: UserDTO["userId"][]
}
