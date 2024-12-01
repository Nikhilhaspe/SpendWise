/* eslint-disable react/prop-types */

// library imports
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faTrashCan,
  faPenToSquare,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoonLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

// css module
import styles from "./MyExpenses.module.css";

// components
import FilterExpenses from "../../FilterExpenses/FilterExpenses.component";

// indexed db queries
import {
  getRecentExpenses,
  deleteExpense,
  getFilteredData,
} from "../../../indexedDbOps";

// constants
const TODAY_DATE = new Date().toISOString().split("T")[0];

function MyExpenses() {
  // RRD
  const navigate = useNavigate();

  // state
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [dateFilter, setDateFilter] = useState({
    fromDate: TODAY_DATE,
    toDate: TODAY_DATE,
  });

  // get data from idb
  async function getExpenses() {
    try {
      setIsLoading(true);

      // recent 10 records
      const data = await getRecentExpenses();

      setExpenses(data);
    } catch (error) {
      toast.error(error.message || "Something went wrong while getting data!");
    } finally {
      setIsLoading(false);
    }
  }

  // event handlers
  async function handleDeleteClick(expenseId) {
    try {
      await deleteExpense(expenseId);
      // re-paint the UI
      await getExpenses();

      toast.success("Deleted Successfully!");
    } catch (error) {
      toast.error(error.message || "Something went wrong while getting data!");
    }
  }

  function handleEditClick(expenseId) {
    navigate(`/app/editExpense/${expenseId}`);
  }

  function handleDateChange(event) {
    setDateFilter({ ...dateFilter, [event.target.name]: event.target.value });
  }

  async function handleFilterClick(filterType) {
    const data = await getFilteredData(
      filterType,
      dateFilter.fromDate,
      dateFilter.toDate
    );

    setExpenses(data);
  }

  // effects
  useEffect(function () {
    async function getData() {
      await getExpenses();
    }

    getData();
  }, []);

  if (isLoading && expenses.length === 0) {
    return (
      <div className={styles.loaderContainer}>
        <MoonLoader color="#f7f9ff" />
      </div>
    );
  }

  return (
    <>
      <div className={styles.filterIconContainer}>
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          icon={faFilter}
          onClick={() =>
            setIsFilterVisible((isFilterVisible) => !isFilterVisible)
          }
        />
      </div>

      {isFilterVisible && (
        <FilterExpenses
          dateFilter={dateFilter}
          handleDateChange={handleDateChange}
          onFilterClick={handleFilterClick}
        />
      )}

      <div className={styles.container}>
        {expenses.length === 0 ? (
          <div className={styles.container}>No Records Found! 😥</div>
        ) : (
          expenses.map((expense) => {
            return (
              <MyExpense
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                key={expense.id}
                expense={expense}
              />
            );
          })
        )}
      </div>
    </>
  );
}

function MyExpense(props) {
  // props
  const { expense, handleEditClick, handleDeleteClick } = props;

  return (
    <div className={styles.expenseContainer}>
      <ToastContainer position="bottom-center" theme="dark" />

      <div className={styles.logoContainer}>
        <FontAwesomeIcon icon={faWallet} />

        <div className={styles.actionsContainer}>
          <FontAwesomeIcon
            onClick={() => handleDeleteClick(expense.id)}
            className={styles.actIcon}
            icon={faTrashCan}
          />
          <FontAwesomeIcon
            onClick={() => handleEditClick(expense.id)}
            className={styles.actIcon}
            icon={faPenToSquare}
          />
        </div>
      </div>

      <div className={styles.infoContainer}>
        <p className={styles.data}>
          Description: &nbsp;
          <span className={styles.dataContent}>{expense.description}</span>
        </p>
        <p className={styles.data}>
          Category: &nbsp;
          <span className={styles.dataContent}>{expense.category}</span>
        </p>
        <p className={styles.data}>
          Amount: &nbsp;
          <span className={styles.dataContent}>{expense.amount}</span>
        </p>
        <p className={styles.data}>
          Date: &nbsp;<span className={styles.dataContent}>{expense.date}</span>
        </p>
      </div>

      {expense.tags.length > 0 && (
        <div className={styles.tagsContainer}>
          <p className={styles.data}>Tags:</p>

          {expense.tags.map((tag, index) => {
            return (
              <div className={styles.tag} key={index}>
                {tag}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyExpenses;
