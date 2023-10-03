import RoomItem from "../../elements/RoomItem/RoomItem";
import styles from "./Rooms.module.css";

const Rooms = () => {
  return (
    <div className={styles.Rooms}>
      <RoomItem />
      <RoomItem />
      <RoomItem />
      <RoomItem />
    </div>
  );
};

export default Rooms;
