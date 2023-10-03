import Button from "../Button/Button";
import styles from "./MessageInput.module.css";

const MessageInput = () => {
  return (
    <div className={styles.MessageInput}>
      <input
        className={styles.InputElement}
        type="text"
        placeholder="Message text..."
      />
      <Button onClick={() => console.log("Click")}>Send</Button>
    </div>
  );
};

export default MessageInput;
