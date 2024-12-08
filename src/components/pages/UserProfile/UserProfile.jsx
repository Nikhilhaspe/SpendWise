/* eslint-disable no-unused-vars */
// css module
import styles from "./UserProfile.module.css";

// context api
import { useAuth } from "../../../contexts/AuthContext";

// expenses indexed dp ops

function UserProfile() {
  // context api
  const { username } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.viewWrapper}>
        <div className={styles.row}>Username : {username} </div>
        <div className={styles.row}>
          <button className={styles.expBtn}>Export Data</button>
        </div>
        <div className={styles.row}>
          <button className={styles.expBtn}>Import Data</button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
