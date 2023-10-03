import styles from "./Layout.module.css";
import Chat from "./components/blocks/Chat/Chat";
import Header from "./components/blocks/Header/Header";
import Rooms from "./components/blocks/Rooms/Rooms";

function Layout() {
  return (
    <div className={styles.Layout}>
      <Header />
      <div className={styles.Content}>
        <Rooms />
        <Chat />
      </div>
    </div>
  );
}

export default Layout;
