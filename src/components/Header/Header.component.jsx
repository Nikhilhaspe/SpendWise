// library imports
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";

// css module
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.headerConntainer}>
      <Link to="/">
        <FontAwesomeIcon className={styles.logo} icon={faSackDollar} />
        <span className={styles.logo}>SpendWise</span>
      </Link>
    </div>
  );
}

export default Header;
