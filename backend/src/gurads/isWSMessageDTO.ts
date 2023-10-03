import { WSMessageDTO } from "../dto/WSMessageDTO"
import { MessageTypes } from "../types/MessageTypes"
import { isSomeEnum } from "./isSomeEnum"

export const isWSMessageDTO = (message: any): message is WSMessageDTO => {
  if (isSomeEnum(MessageTypes)(message.type) && typeof message.userId === "number") {
    return true
  }
  return false
}
