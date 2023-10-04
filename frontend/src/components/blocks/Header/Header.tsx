import { useAppSelector } from "../../../store/hooks";
import styles from "./Header.module.css";

const Header = () => {
  const { userId } = useAppSelector((state) => state.user);

  return (
    <div className={styles.Header}>
      <span className={styles.Logo}>Live Chat</span>
      {userId && <span className={styles.Logo}>{":" + userId}</span>}
    </div>
  );
};

export default Header;
