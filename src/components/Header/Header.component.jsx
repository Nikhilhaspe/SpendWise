// library imports
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";

// css module
import styles from "./Header.module.css";

// context api
import { useTheme } from "../../contexts/ThemeContext";

function Header() {
  // context api
  const { theme } = useTheme();

  return (
    <div
      className={`${styles.headerContainer} ${
        theme === "dark" ? "" : "lightMode"
      }`}
    >
      <Link to="/SpendWise">
        <FontAwesomeIcon className={styles.logo} icon={faSackDollar} />
        <span className={styles.logo}>SpendWise</span>
      </Link>
    </div>
  );
}

export default Header;
