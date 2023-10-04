import { UserDTO } from "../dto/WSMessageDTO"

export const isUserDTO = (value: any): value is UserDTO => {
  if (value.userId || value.username) {
    return true
  }
  return false
}
