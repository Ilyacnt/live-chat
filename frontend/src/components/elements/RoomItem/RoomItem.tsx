import styles from "./RoomItem.module.css";
import PersonCircleSVG from "../../../assets/person-circle.svg?react";
import { InputHTMLAttributes } from "react";
import cn from "classnames";
import { useAppDispatch } from "../../../store/hooks";
import { IUser, setCurrentUserChat } from "../../../store/chat/chatSlice";

interface RoomItemProps extends InputHTMLAttributes<HTMLDivElement> {
  user: IUser;
  isActive?: boolean;
}

const RoomItem: React.FC<RoomItemProps> = ({ isActive = false, user }) => {
  const dispatch = useAppDispatch();

  const onRoomClickHandle = () => {
    dispatch(setCurrentUserChat(user));
  };

  return (
    <div
      className={cn(styles.RoomItem, { [styles.Active]: isActive })}
      tabIndex={1}
      onClick={onRoomClickHandle}
    >
      <div className={styles.ImageIcon}>
        <PersonCircleSVG />
      </div>
      <div className={styles.Name}>{user.userId}</div>
      <div className={styles.Message}>
        {(Array.isArray(user.messages) &&
          user.messages.length > 0 &&
          user.messages[user.messages.length - 1].text) ||
          "No messages yet"}
      </div>
    </div>
  );
};

export default RoomItem;
