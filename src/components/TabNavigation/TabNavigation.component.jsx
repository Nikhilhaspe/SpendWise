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
  faSun,
} from "@fortawesome/free-solid-svg-icons";

// css module
import styles from "./TabNavigation.module.css";

// context api
import { useTheme } from "../../contexts/ThemeContext";

function TabNavigation() {
  // context api
  const { theme, dispatch } = useTheme();

  console.log(theme);

  return (
    <div className={styles.tabNavContainer}>
      <div
        onClick={() => dispatch({ type: "toggleTheme" })}
        className={`${styles.tab} ${styles.themeContainer}`}
      >
        <div className={styles.iconContainer}>
          {theme === "dark" ? (
            <FontAwesomeIcon icon={faMoon} />
          ) : (
            <FontAwesomeIcon icon={faSun} />
          )}
        </div>
      </div>
      <div className={styles.tab}>
        <NavLink to="analyzeExpense">
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faChartLine} />
          </div>
        </NavLink>
      </div>
      <div className={styles.tab}>
        <NavLink to="addExpense">
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </NavLink>
      </div>
      <div className={styles.tab}>
        <NavLink to="expenses">
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faCoins} />
          </div>
        </NavLink>
      </div>
      <div className={styles.tab}>
        <NavLink to="profile">
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faUser} />
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default TabNavigation;
