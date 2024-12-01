/* eslint-disable react/prop-types */
// library imports
import { useState } from "react";

// css module
import styles from "./FilterExpenses.module.css";

function FilterExpenses(props) {
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
    <div className={styles.filterContainerWrapper}>
      <div className={styles.filtersContainer}>
        <div
          onClick={() => handleFilterClick("thismonth")}
          className={`${styles.filter} ${
            currentFilter === "thismonth" ? styles.active : ""
          }`}
        >
          This Month
        </div>

        <div
          onClick={() => handleFilterClick("lastmonth")}
          className={`${styles.filter} ${
            currentFilter === "lastmonth" ? styles.active : ""
          }`}
        >
          Last Month
        </div>

        <div
          onClick={() => handleFilterClick("datewise")}
          className={`${styles.filter} ${
            currentFilter === "datewise" ? styles.active : ""
          }`}
        >
          Choose Period
        </div>
      </div>

      {currentFilter === "datewise" && (
        <div className={styles.customDateFilterContainer}>
          <div className={styles.dateContainer}>
            <label>From Date</label>
            <input
              onKeyDown={(event) => event.preventDefault()}
              value={dateFilter.fromDate}
              type="date"
              name="fromDate"
              onChange={handleDateChange}
            />

            <label>To Date</label>
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
