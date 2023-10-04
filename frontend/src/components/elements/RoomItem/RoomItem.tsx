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
      <span className={styles.Name}>{user.userId}</span>
      <span className={styles.Message}>
        {user.messages[0].text || "No messages yet"}
      </span>
    </div>
  );
};

export default RoomItem;
