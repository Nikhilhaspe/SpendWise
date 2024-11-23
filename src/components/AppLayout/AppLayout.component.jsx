// library imports
import { Outlet } from "react-router-dom";

// css module
import styles from "./AppLayout.module.css";

// components
import TabNavigation from "../TabNavigation/TabNavigation.component";

function AppLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.outletContainer}>
        <Outlet />
      </div>

      <TabNavigation />
    </div>
  );
}

export default AppLayout;
