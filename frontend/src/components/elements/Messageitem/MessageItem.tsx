import styles from "./MessageItem.module.css";
import React, { InputHTMLAttributes, ReactElement } from "react";

interface MessageItemProps extends InputHTMLAttributes<HTMLDivElement> {
  children: ReactElement | string;
  timestamp: number;
  fromMySide?: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({
  children,
  timestamp,
  fromMySide = false,
}) => {
  const dateTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={fromMySide ? styles.MessageMy : styles.MessageOther}>
      <span className={styles.MessageItem}>
        {children} <span className={styles.Timestamp}>{dateTime}</span>
      </span>
    </div>
  );
};

export default MessageItem;
