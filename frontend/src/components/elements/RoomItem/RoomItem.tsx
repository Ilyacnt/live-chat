import styles from "./RoomItem.module.css";
import PersonCircleSVG from "../../../assets/person-circle.svg?react";
import { InputHTMLAttributes } from "react";
import cn from "classnames";

interface RoomItemProps extends InputHTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
}

const RoomItem: React.FC<RoomItemProps> = ({ isActive = false }) => {
  return (
    <div
      className={cn(styles.RoomItem, { [styles.Active]: isActive })}
      tabIndex={1}
    >
      <div className={styles.ImageIcon}>
        <PersonCircleSVG />
      </div>
      <span className={styles.Name}>Name Here</span>
      <span className={styles.Message}>Message here</span>
    </div>
  );
};

export default RoomItem;
