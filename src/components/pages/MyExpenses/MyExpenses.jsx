// css module
import styles from "./MyExpenses.module.css";

// indexed db queries
import { getAllExpenses } from "../../../indexedDbOps";

function MyExpenses() {
  return <div className={styles.container}>MY EXPENSES</div>;
}

export default MyExpenses;
