// library imports
import { toast, ToastContainer } from "react-toastify";
import { useReducer } from "react";
import "react-toastify/dist/ReactToastify.css";

// css module
import styles from "./AddExpense.module.css";

// utility functions
import { getUniqueId, isBlankOrEmpty } from "../../../utilities";

// reducer
const INITIAL_STATE = {
  description: "",
  category: "",
  amount: 0,
  date: new Date().toISOString().split("T")[0],
  currentTag: "",
  tags: [],
};
function reducer(state, action) {
  switch (action.type) {
    case "fieldChange":
      return { ...state, [action.payload.name]: action.payload.value };
    case "tagRemove":
      return {
        ...state,
        tags: state.tags.filter((tag) => tag !== action.payload),
      };
    case "tagAdd":
      return {
        ...state,
        currentTag: "",
        tags: [...state.tags, state.currentTag],
      };
    default:
      return state;
  }
}

function AddExpense() {
  // state
  const [{ description, category, amount, date, tags, currentTag }, dispatch] =
    useReducer(reducer, INITIAL_STATE);

  // event handlers
  function handleFormChange(event) {
    dispatch({
      type: "fieldChange",
      payload: { name: event.target.name, value: event.target.value },
    });
  }

  function handleTagRemove(tag) {
    dispatch({ type: "tagRemove", payload: tag });
  }

  function handleTagAdd() {
    if (currentTag.length < 1) return;

    dispatch({ type: "tagAdd" });
  }

  function saveExpense() {
    const payload = {
      id: getUniqueId(),
      description,
      category,
      amount: Number(amount),
      date,
      currentTag,
      tags,
    };

    if (validatePayload(payload)) return;

    // add data to the indexedDB
  }

  function validatePayload(payload) {
    if (isBlankOrEmpty(payload.description)) {
      toast.error("Description can not be empty!");
      return true;
    }

    if (isBlankOrEmpty(payload.category)) {
      toast.error("Category can not be empty!");
      return true;
    }

    if (payload.amount === 0) {
      toast.error("Amount can not be zero!");
      return true;
    }
  }

  return (
    <div className={styles.container}>
      <ToastContainer position="top-center" theme="dark" />
      <div className={styles.formWrapper}>
        <div className={styles.row}>
          <input
            placeholder="Enter Your Description"
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.row}>
          <input
            type="text"
            placeholder="Enter Your Category"
            name="category"
            id="category"
            value={category}
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.row}>
          <input
            type="number"
            placeholder="Enter Amount Spent"
            name="amount"
            id="amount"
            value={amount}
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.row}>
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={handleFormChange}
          />
        </div>
        <div className={`${styles.row} ${styles.addTagPosition}`}>
          <input
            type="text"
            placeholder="Specify Tags (Optional)"
            name="currentTag"
            id="currentTag"
            onChange={handleFormChange}
            value={currentTag}
          />

          <div onClick={handleTagAdd} className={styles.addTagBtn}>
            +
          </div>
        </div>
        <div className={styles.tagsContainer}>
          {tags.map((tag, index) => {
            return (
              <div
                key={index}
                className={styles.tagsTab}
                onClick={() => handleTagRemove(tag)}
              >
                {tag} &times;
              </div>
            );
          })}
        </div>

        <div className={styles.saveBtn} onClick={saveExpense}>
          Save
        </div>
      </div>
    </div>
  );
}

export default AddExpense;
