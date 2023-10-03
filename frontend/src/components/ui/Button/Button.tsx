import { InputHTMLAttributes, ReactElement } from "react";
import cn from "classnames";
import styles from "./Button.module.css";

interface ButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
  children: ReactElement | string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button className={cn(styles.Button, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
