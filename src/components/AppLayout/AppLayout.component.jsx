// library imports
import { Outlet } from "react-router-dom";

// css module
import styles from "./AppLayout.module.css";

// components
import Header from "../Header/Header.component";
import TabNavigation from "../TabNavigation/TabNavigation.component";

function AppLayout() {
  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.outletContainer}>
        <Outlet />
      </div>

      <TabNavigation />
    </div>
  );
}

export default AppLayout;
