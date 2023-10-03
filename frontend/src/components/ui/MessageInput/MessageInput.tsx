import {
  ChangeEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  useState,
} from "react";
import Button from "../Button/Button";
import styles from "./MessageInput.module.css";

interface MessageInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onMessageSend: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onMessageSend,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const inputOnChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const inputOnKeyPressHandle = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onMessageSend(inputValue);
      setInputValue("");
    }
  };

  const buttonOnClickHandle = () => {
    onMessageSend(inputValue);
    setInputValue("");
  };

  return (
    <div className={styles.MessageInput}>
      <input
        className={styles.InputElement}
        type="text"
        placeholder="Message text..."
        value={inputValue}
        onChange={inputOnChangeHandle}
        onKeyDown={inputOnKeyPressHandle}
        {...props}
      />
      <Button onClick={buttonOnClickHandle}>Send</Button>
    </div>
  );
};

export default MessageInput;
