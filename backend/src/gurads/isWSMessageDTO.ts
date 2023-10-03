import { WSMessageDTO } from "../dto/WSMessageDTO"
import { MessageTypes } from "../types/MessageTypes"
import { isSomeEnum } from "./isSomeEnum"
import { isUserDTO } from "./isUserDTO"

export const isWSMessageDTO = (message: any): message is WSMessageDTO => {
  if (isSomeEnum(MessageTypes)(message.type) && isUserDTO(message.user)) {
    return true
  }
  return false
}
