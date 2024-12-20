/* eslint-disable react/prop-types */

// library imports
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faTrashCan,
  faPenToSquare,
  faFilter,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { MoonLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// css module
import styles from "./MyExpenses.module.css";

// components
import FilterExpenses from "../../FilterExpenses/FilterExpenses.component";

// context api
import { useAuth } from "../../../contexts/AuthContext";
import { useTheme } from "../../../contexts/ThemeContext";

// indexed db queries
import {
  getRecentExpenses,
  deleteExpense,
  getFilteredData,
} from "../../../ExpenseDbOps";
import { getExpensesByTag, getUniqueTags } from "../../../utilities";

// constants
const TODAY_DATE = new Date().toISOString().split("T")[0];

function MyExpenses() {
  // context api
  const { username } = useAuth();
  const { theme } = useTheme();

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
  const [isTagsDropdownVisible, setIsTagsDropdownVisible] = useState(false);
  const [tagOptions, setTagOptions] = useState(["Tag-1", "Tag-2"]);
  const [tagFilteredExpenses, setTagFilteredExpenses] = useState([]);

  // get data from idb
  async function getExpenses() {
    try {
      setIsLoading(true);

      // recent 10 records
      const data = await getRecentExpenses(username);

      setExpenses(data);
      setTagOptions(getUniqueTags(data));
    } catch (error) {
      toast.error(error.message || "Something went wrong while getting data!");
    } finally {
      setIsLoading(false);
    }
  }

  // event handlers
  async function handleDeleteClick(expenseId) {
    try {
      await deleteExpense(username, expenseId);
      // re-paint the UI
      await getExpenses();

      toast.success("Deleted Successfully!");
    } catch (error) {
      toast.error(error.message || "Something went wrong while getting data!");
    }
  }

  function handleEditClick(expenseId) {
    navigate(`/SpendWise/app/editExpense/${expenseId}`);
  }

  function handleDateChange(event) {
    setDateFilter({ ...dateFilter, [event.target.name]: event.target.value });
  }

  function handleTagOptionClick(selectedTag) {
    setIsTagsDropdownVisible(false);

    const data = getExpensesByTag(expenses, selectedTag);
    setTagFilteredExpenses(data);
  }

  function handleClearTagClick() {
    setTagFilteredExpenses([]);
  }

  async function handleFilterClick(filterType) {
    try {
      setIsFilterVisible(false);
      setIsLoading(true);

      const data = await getFilteredData(
        username,
        filterType,
        dateFilter.fromDate,
        dateFilter.toDate
      );

      setExpenses(data);
      setTagOptions(getUniqueTags(data));
    } catch (error) {
      toast.error(error.message || "Something went wrong while filtering data");
    } finally {
      setIsLoading(false);
    }
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
        <MoonLoader color={theme === "dark" ? "#f7f9ff" : "#393e46"} />
      </div>
    );
  }

  return (
    <>
      <div
        className={`${styles.filterIconContainer} ${
          theme === "dark" ? "" : "lightMode"
        }`}
      >
        <FontAwesomeIcon
          className={theme === "dark" ? "" : "lightModeText"}
          style={{ cursor: "pointer" }}
          icon={faFilter}
          onClick={() =>
            setIsFilterVisible((isFilterVisible) => !isFilterVisible)
          }
        />
      </div>

      {expenses.length > 0 && (
        <div
          className={`${styles.tagsFilterContainer} ${
            theme === "dark" ? "" : "lightMode"
          }`}
        >
          <div className={styles.tagsLabel}>
            <span
              onClick={() =>
                setIsTagsDropdownVisible(
                  (isTagsDropdownVisible) => !isTagsDropdownVisible
                )
              }
            >
              <FontAwesomeIcon
                className={theme === "dark" ? "" : "lightModeText"}
                icon={isTagsDropdownVisible ? faMinus : faPlus}
              />
              <span className={`${theme === "dark" ? "" : "lightModeText"}`}>
                &nbsp; Get expenses by your tag
              </span>
            </span>
            {tagFilteredExpenses.length > 0 && (
              <span
                onClick={handleClearTagClick}
                className={styles.clearTagContainer}
              >
                <FontAwesomeIcon
                  className={theme === "dark" ? "" : "lightModeText"}
                  icon={faTrashCan}
                />
                <span className={`${theme === "dark" ? "" : "lightModeText"}`}>
                  &nbsp; Clear Tag
                </span>
              </span>
            )}
          </div>
          {isTagsDropdownVisible && (
            <div className={styles.tagsSelect}>
              {tagOptions.map((tagOption, index) => (
                <div
                  onClick={() => handleTagOptionClick(tagOption)}
                  key={index}
                  className={styles.tagOption}
                >
                  <span
                    className={`${theme === "dark" ? "" : "lightModeText"}`}
                  >
                    {tagOption}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {isFilterVisible && (
        <FilterExpenses
          dateFilter={dateFilter}
          handleDateChange={handleDateChange}
          onFilterClick={handleFilterClick}
        />
      )}

      <div
        className={`${styles.container} ${theme === "dark" ? "" : "lightMode"}`}
      >
        <ToastContainer position="top-center" theme="dark" />

        {tagFilteredExpenses.length !== 0 ? (
          tagFilteredExpenses.map((expense) => {
            return (
              <MyExpense
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                key={expense.id}
                expense={expense}
              />
            );
          })
        ) : expenses.length > 0 ? (
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
        ) : (
          <div className={styles.container}>No Records Found! 😥</div>
        )}
      </div>
    </>
  );
}

function MyExpense(props) {
  // props
  const { expense, handleEditClick, handleDeleteClick } = props;

  // context api
  const { theme } = useTheme();

  return (
    <div
      className={`${styles.expenseContainer} ${
        theme === "dark" ? "" : styles.lightStyles
      }`}
    >
      <div className={styles.logoContainer}>
        <FontAwesomeIcon
          className={theme === "dark" ? "" : "lightModeText"}
          icon={faWallet}
        />

        <div className={styles.actionsContainer}>
          <FontAwesomeIcon
            onClick={() => handleDeleteClick(expense.id)}
            className={`${styles.actIcon} ${
              theme === "dark" ? "" : "lightModeText"
            }`}
            icon={faTrashCan}
          />
          <FontAwesomeIcon
            onClick={() => handleEditClick(expense.id)}
            className={`${styles.actIcon} ${
              theme === "dark" ? "" : "lightModeText"
            }`}
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
              <div
                className={`${styles.tag} ${
                  theme === "dark" ? "" : styles.darkBorder
                }`}
                key={index}
              >
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
