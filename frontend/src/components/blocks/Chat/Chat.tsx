import MessageItem from "../../elements/Messageitem/MessageItem";
import MessageInput from "../../ui/MessageInput/MessageInput";
import styles from "./Chat.module.css";

const Chat = () => {
  return (
    <div className={styles.Chat}>
      <div className={styles.MessageArea}>
        <MessageItem>test</MessageItem>
        <MessageItem fromMySide>Hello There</MessageItem>
      </div>
      <MessageInput />
    </div>
  );
};

export default Chat;
