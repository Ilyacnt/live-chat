import { useState } from "react";
import { IMessageItem } from "../../../types/MessageItem";
import MessageItem from "../../elements/Messageitem/MessageItem";
import MessageInput from "../../ui/MessageInput/MessageInput";
import styles from "./Chat.module.css";

const Chat = () => {
  const [messages, setMessages] = useState<
    Pick<IMessageItem, "id" | "text" | "fromMySide">[]
  >([{ id: 1, text: "Hello", fromMySide: false }]);

  const onMessageSendHandle = (message: string) => {
    if (!message) return;
    console.log(message);
    setMessages([
      ...messages,
      { id: Date.now(), text: message, fromMySide: true },
    ]);
  };

  return (
    <div className={styles.Chat}>
      <div className={styles.MessageArea}>
        {messages.map((message) => (
          <MessageItem key={message.id} fromMySide={message.fromMySide}>
            {message.text as string}
          </MessageItem>
        ))}
      </div>
      <MessageInput onMessageSend={onMessageSendHandle} />
    </div>
  );
};

export default Chat;
