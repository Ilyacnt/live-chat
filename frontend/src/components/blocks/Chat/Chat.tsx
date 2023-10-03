import MessageInput from "../../ui/MessageInput/MessageInput";
import styles from "./Chat.module.css";

const Chat = () => {
  return (
    <div className={styles.Chat}>
      <span>chat</span>
      <MessageInput />
    </div>
  );
};

export default Chat;
