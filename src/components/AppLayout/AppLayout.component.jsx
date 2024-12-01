// library imports
import { Outlet } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// css module
import styles from "./AppLayout.module.css";

// components
import Header from "../Header/Header.component";
import TabNavigation from "../TabNavigation/TabNavigation.component";

function AppLayout() {
  return (
    <div className={styles.container}>
      <ToastContainer position="top-center" theme="dark" />

      <Header />

      <div className={styles.outletContainer}>
        <Outlet context={toast} />
      </div>

      <TabNavigation />
    </div>
  );
}

export default AppLayout;
