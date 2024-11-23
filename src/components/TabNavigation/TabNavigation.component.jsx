// library imports
import { NavLink } from "react-router-dom";

// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faCoins,
  faChartLine,
  faPlus,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

// css module
import styles from "./TabNavigation.module.css";

function TabNavigation() {
  return (
    <div className={styles.tabNavContainer}>
      <div className={`${styles.tab} ${styles.themeContainer}`}>
        <div className={styles.iconContainer}>
          <FontAwesomeIcon icon={faMoon} />
        </div>
      </div>
      <div className={styles.tab}>
        <NavLink to="analyzeExpense">
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faChartLine} />
          </div>
          {/* <div>Analyze Expenses</div> */}
        </NavLink>
      </div>
      <div className={styles.tab}>
        <NavLink to="addExpense">
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
          {/* <div>Add New Expense</div> */}
        </NavLink>
      </div>
      <div className={styles.tab}>
        <NavLink to="expenses">
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faCoins} />
          </div>
          {/* <div>My Expenses</div> */}
        </NavLink>
      </div>
      <div className={styles.tab}>
        <NavLink to="profile">
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faUser} />
          </div>
          {/* <div>Profile</div> */}
        </NavLink>
      </div>
    </div>
  );
}

export default TabNavigation;
