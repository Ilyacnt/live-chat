import styles from "./MessageItem.module.css";
import React, { InputHTMLAttributes, ReactElement } from "react";

interface MessageItemProps extends InputHTMLAttributes<HTMLDivElement> {
  children: ReactElement | string;
  fromMySide?: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({
  children,
  fromMySide = false,
}) => {
  return (
    <div className={fromMySide ? styles.MessageMy : styles.MessageOther}>
      <span className={styles.MessageItem}>{children}</span>
    </div>
  );
};

export default MessageItem;
