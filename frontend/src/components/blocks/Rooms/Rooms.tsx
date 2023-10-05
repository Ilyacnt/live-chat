import { IUser } from "../../../store/chat/chatSlice";
import { useAppSelector } from "../../../store/hooks";
import RoomItem from "../../elements/RoomItem/RoomItem";
import styles from "./Rooms.module.css";

const Rooms = () => {
  const usersRooms = useAppSelector((state) => state.chat.users);
  const currentUserChat = useAppSelector((state) => state.chat.currentUserChat);

  const isActiveUser = (user: IUser) => {
    return currentUserChat.userId === user.userId;
  };

  return (
    <div className={styles.Rooms}>
      {usersRooms.length > 0 ? (
        usersRooms.length > 0 &&
        usersRooms.map((room) => (
          <RoomItem
            key={room.userId}
            user={room}
            isActive={isActiveUser(room)}
          />
        ))
      ) : (
        <div className={styles.NoUsers}>
          <span>There is no users yet</span>
        </div>
      )}
    </div>
  );
};

export default Rooms;
