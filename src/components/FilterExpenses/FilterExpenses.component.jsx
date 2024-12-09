/* eslint-disable react/prop-types */
// library imports
import { useState } from "react";

// css module
import styles from "./FilterExpenses.module.css";

// context api
import { useTheme } from "../../contexts/ThemeContext";

function FilterExpenses(props) {
  // context api
  const { theme } = useTheme();

  // props
  const { onFilterClick, dateFilter, handleDateChange } = props;

  // state
  const [currentFilter, setCurrentFilter] = useState("");

  // event handlers
  function handleFilterClick(filterType) {
    setCurrentFilter(filterType);
  }

  function handleFilterButtonClick() {
    onFilterClick(currentFilter);
  }

  return (
    <div
      className={`${styles.filterContainerWrapper} ${
        theme === "dark" ? "" : "lightMode"
      }`}
    >
      <div className={styles.filtersContainer}>
        <div
          onClick={() => handleFilterClick("thismonth")}
          className={`${styles.filter} ${
            currentFilter === "thismonth" ? styles.active : ""
          } ${theme === "dark" ? "" : styles.darkFilter}`}
        >
          <span className={`${theme === "dark" ? "" : "lightModeText"}`}>
            This Month
          </span>
        </div>

        <div
          onClick={() => handleFilterClick("lastmonth")}
          className={`${styles.filter} ${
            currentFilter === "lastmonth" ? styles.active : ""
          } ${theme === "dark" ? "" : styles.darkFilter}`}
        >
          <span className={`${theme === "dark" ? "" : "lightModeText"}`}>
            Last Month
          </span>
        </div>

        <div
          onClick={() => handleFilterClick("datewise")}
          className={`${styles.filter} ${
            currentFilter === "datewise" ? styles.active : ""
          } ${theme === "dark" ? "" : styles.darkFilter}`}
        >
          <span className={`${theme === "dark" ? "" : "lightModeText"}`}>
            Choose Period
          </span>
        </div>
      </div>

      {currentFilter === "datewise" && (
        <div
          className={`${styles.customDateFilterContainer} ${
            theme === "dark" ? "" : styles.lightRow
          }`}
        >
          <div className={styles.dateContainer}>
            <span className={`${theme === "dark" ? "" : "lightModeText"}`}>
              From Date
            </span>
            <input
              onKeyDown={(event) => event.preventDefault()}
              value={dateFilter.fromDate}
              type="date"
              name="fromDate"
              onChange={handleDateChange}
            />

            <span className={`${theme === "dark" ? "" : "lightModeText"}`}>
              To Date
            </span>
            <input
              onKeyDown={(event) => event.preventDefault()}
              value={dateFilter.toDate}
              type="date"
              name="toDate"
              onChange={handleDateChange}
            />
          </div>
        </div>
      )}

      <button onClick={handleFilterButtonClick}>Filter</button>
      <button onClick={() => onFilterClick("clear")}>Clear Filter</button>
    </div>
  );
}

export default FilterExpenses;
