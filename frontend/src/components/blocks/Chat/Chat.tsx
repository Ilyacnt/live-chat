import { useEffect, useRef, useState } from "react";
import { IMessageItem } from "../../../types/MessageItem";
import MessageItem from "../../elements/Messageitem/MessageItem";
import MessageInput from "../../ui/MessageInput/MessageInput";
import styles from "./Chat.module.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setUser } from "../../../store/user/userSlice";
import { MessageTypes } from "../../../types/MessageTypes";
import { addMessage, addUsers } from "../../../store/chat/chatSlice";

const Chat = () => {
  const [messages, setMessages] = useState<
    Pick<IMessageItem, "id" | "text" | "fromMySide">[]
  >([{ id: 1, text: "Hello", fromMySide: false }]);
  const socketRef = useRef<WebSocket | null>(null);

  const currentUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const onMessageSendHandle = (message: string) => {
    if (!message) return;
    console.log(message);
    setMessages([
      ...messages,
      { id: Date.now(), text: message, fromMySide: true },
    ]);
  };

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8999/");

    if (!socketRef.current) return;

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === MessageTypes.USER_SET) {
        dispatch(setUser({ userId: data.userId }));
      } else if (data.type === MessageTypes.MESSAGE_SEND) {
        dispatch(addMessage(data));
      } else if (data.type === MessageTypes.USERS_GET) {
        console.log(data);
        dispatch(addUsers(data.userIds));
      }
    };
  }, []);

  useEffect(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current?.send(
        JSON.stringify({ type: MessageTypes.USERS_GET, user: currentUser })
      );
    }
  }, [currentUser.userId]);

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
