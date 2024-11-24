// library imports
import { useParams } from "react-router-dom";

// css module
import styles from "./EditExpense.module.css";

function EditExpense() {
  // RRD
  const { expenseId } = useParams();

  return <div className={styles.container}>{expenseId}</div>;
}

export default EditExpense;
