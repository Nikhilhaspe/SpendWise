/* eslint-disable react/prop-types */
// library imports
import { useEffect, useReducer } from "react";
import { MoonLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// css module
import styles from "./AddEditCommonForm.module.css";

// utility functions
import { getUniqueId, isBlankOrEmpty } from "../../utilities";

// context api
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

// indexed db queries
import { addExpense, getExpense, updateExpense } from "../../ExpenseDbOps";

// components
import Tags from "../Tags/Tags.component";
import { useParams } from "react-router-dom";

// reducer
const INITIAL_STATE = {
  description: "",
  category: "",
  amount: 0,
  date: new Date().toISOString().split("T")[0],
  currentTag: "",
  tags: [],
  isLoading: false,
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
        tags: [...state.tags, state.currentTag.trim().toLowerCase()],
      };
    case "toggleLoading":
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case "fillEditData":
      return {
        ...state,
        description: action.payload.description,
        category: action.payload.category,
        amount: action.payload.amount,
        date: action.payload.date,
        tags: action.payload.tags,
      };
    case "reset":
      return {
        ...state,
        description: "",
        category: "",
        amount: 0,
        date: new Date().toISOString().split("T")[0],
        currentTag: "",
        tags: [],
      };
    default:
      return state;
  }
}

function AddEditCommonForm() {
  // context api
  const { username } = useAuth();
  const { theme } = useTheme();

  // RRD
  const { expenseId } = useParams();

  // state
  const [
    { description, category, amount, date, tags, currentTag, isLoading },
    dispatch,
  ] = useReducer(reducer, INITIAL_STATE);

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

  // root: Handle Submit Form
  async function handleSubmitForm(submitType) {
    switch (submitType) {
      case "add":
        await saveExpense();
        return;
      case "edit":
        await editExpense();
        return;
      default:
        throw new Error("Invalid Submit Button Type");
    }
  }

  // save expense
  async function saveExpense() {
    try {
      dispatch({ type: "toggleLoading" });

      const payload = {
        id: getUniqueId(),
        description,
        category,
        amount: Number(amount),
        date,
        tags,
      };

      if (validatePayload(payload)) return;

      // add data to the indexedDB
      await addExpense(username, payload);

      dispatch({ type: "reset" });

      toast.success("Saved Successfully!");
    } catch (error) {
      toast.error(error.message || "Something went wrong while adding data!");
    } finally {
      dispatch({ type: "toggleLoading" });
    }
  }

  // get expense by id
  async function getCurrentExpenseData(id) {
    try {
      dispatch({ type: "toggleLoading" });

      const currentExpense = await getExpense(username, id);

      dispatch({ type: "fillEditData", payload: currentExpense });
    } catch (error) {
      toast.error(error.message || "Something went wrong while adding data!");
    } finally {
      dispatch({ type: "toggleLoading" });
    }
  }

  // edit expense
  async function editExpense() {
    try {
      dispatch({ type: "toggleLoading" });

      const payload = {
        id: expenseId,
        description,
        category,
        amount: Number(amount),
        date,
        tags,
      };

      if (validatePayload(payload)) return;

      // add data to the indexedDB
      await updateExpense(username, payload);

      dispatch({ type: "reset" });

      toast.success("Saved Successfully!");
    } catch (error) {
      toast.error(error.message || "Something went wrong while adding data!");
    } finally {
      dispatch({ type: "toggleLoading" });
    }
  }

  // Effects
  useEffect(function () {
    async function asyncHelper(id) {
      await getCurrentExpenseData(id);
    }

    if (expenseId) asyncHelper(expenseId);
    else dispatch({ type: "reset" });
  }, []);

  // utility functions
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
    <div
      className={`${styles.container} ${theme === "dark" ? "" : "lightMode"}`}
    >
      <ToastContainer position="top-center" theme="dark" />

      <p className={styles.actionHeader}>
        {expenseId ? "Edit Your Expense" : "Add New Expense"}
      </p>

      <div className={styles.formWrapper}>
        <div
          className={`${styles.row} ${theme === "dark" ? "" : styles.lightRow}`}
        >
          <input
            placeholder="Enter Description"
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={handleFormChange}
          />
        </div>
        <div
          className={`${styles.row} ${theme === "dark" ? "" : styles.lightRow}`}
        >
          <input
            type="text"
            placeholder="Enter Category"
            name="category"
            id="category"
            value={category}
            onChange={handleFormChange}
          />
        </div>
        <div
          className={`${styles.row} ${theme === "dark" ? "" : styles.lightRow}`}
        >
          <input
            type="number"
            placeholder="Enter Amount Spent"
            name="amount"
            id="amount"
            value={amount}
            onChange={handleFormChange}
          />
        </div>
        <div
          className={`${styles.row} ${theme === "dark" ? "" : styles.lightRow}`}
        >
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={handleFormChange}
          />
        </div>
        <div
          className={`${styles.row} ${styles.addTagPosition} ${
            theme === "dark" ? "" : styles.lightRow
          }`}
        >
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

        <Tags tags={tags} handleTagRemove={handleTagRemove} />

        <button
          className={styles.saveBtn}
          onClick={() => handleSubmitForm(expenseId ? "edit" : "add")}
        >
          {isLoading ? (
            <MoonLoader
              size={30}
              color={theme === "dark" ? "#f7f9ff" : "#393e46"}
            />
          ) : expenseId ? (
            "Edit Your Expense"
          ) : (
            "Add New Expense"
          )}
        </button>
      </div>
    </div>
  );
}

export default AddEditCommonForm;
