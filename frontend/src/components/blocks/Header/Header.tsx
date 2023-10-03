import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.Header}>
      <span className={styles.Logo}>Live Chat</span>
    </div>
  );
};

export default Header;
