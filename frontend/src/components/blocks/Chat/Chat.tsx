import { useEffect, useRef, useState } from "react";
import MessageItem from "../../elements/Messageitem/MessageItem";
import MessageInput from "../../ui/MessageInput/MessageInput";
import styles from "./Chat.module.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setUser } from "../../../store/user/userSlice";
import { MessageTypes } from "../../../types/MessageTypes";
import {
  IUserMessage,
  addMessage,
  addUsers,
} from "../../../store/chat/chatSlice";

const Chat = () => {
  const socketRef = useRef<WebSocket | null>(null);

  const currentUser = useAppSelector((state) => state.user);
  const { userId, messages } = useAppSelector(
    (state) => state.chat.currentUserChat
  );

  const dispatch = useAppDispatch();

  const onMessageSendHandle = (message: string) => {
    if (!message) return;

    const newMessage: IUserMessage = {
      user: {
        userId: currentUser.userId,
      },
      type: MessageTypes.MESSAGE_SEND,
      text: message,
      timestamp: Date.now(),
      receivers: [userId],
    };

    socketRef.current?.send(JSON.stringify(newMessage));

    dispatch(addMessage(newMessage));
  };

  const isFromMySide = (
    message: IUserMessage & { user: { userId: string } }
  ) => {
    return message.user.userId === currentUser.userId;
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
        console.log(data);

        dispatch(addMessage(data));
      } else if (data.type === MessageTypes.USERS_GET) {
        dispatch(addUsers(data.userIds));
      }
    };

    return () => {
      socketRef.current?.close();
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
        {messages &&
          messages.map((message) => (
            <MessageItem
              key={message.timestamp}
              timestamp={message.timestamp}
              fromMySide={isFromMySide(message)}
            >
              {message.text as string}
            </MessageItem>
          ))}
      </div>
      <MessageInput onMessageSend={onMessageSendHandle} />
    </div>
  );
};

export default Chat;
