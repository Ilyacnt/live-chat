import { SendMessageWSMessageDTO } from "../dto/WSMessageDTO"
import { MessageTypes } from "../types/MessageTypes"
import { isUserDTO } from "./isUserDTO"

export const isSendMessageWSMessageDTO = (message: any): message is SendMessageWSMessageDTO => {
  if (
    isUserDTO(message.user) &&
    message.type === MessageTypes.MESSAGE_SEND &&
    typeof message.text === "string" &&
    typeof message.timestamp === "number" &&
    Array.isArray(message.receivers)
  ) {
    return true
  }
  return false
}
