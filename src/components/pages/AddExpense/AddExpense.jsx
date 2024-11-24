// library imports
import { useReducer } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoonLoader } from "react-spinners";

// css module
import styles from "./AddExpense.module.css";

// utility functions
import { getUniqueId, isBlankOrEmpty } from "../../../utilities";

// indexed db queries
import { addExpense } from "../../../indexedDbOps";

// components
import Tags from "../../Tags/Tags.component";

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
        tags: [...state.tags, state.currentTag],
      };
    case "toggleLoading":
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case "reset":
      return {
        description: "",
        category: "",
        amount: 0,
        date: new Date().toISOString().split("T")[0],
        currentTag: "",
        tags: [],
        isLoading: true,
      };
    default:
      return state;
  }
}

function AddExpense() {
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
      await addExpense(payload);

      dispatch({ type: "reset" });

      toast.success("Saved Successfully!");
    } catch (error) {
      toast.error(error.message || "Something went wrong while adding data!");
    } finally {
      dispatch({ type: "toggleLoading" });
    }
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
            placeholder="Enter Description"
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
            placeholder="Enter Category"
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

        <Tags tags={tags} handleTagRemove={handleTagRemove} />

        <button className={styles.saveBtn} onClick={saveExpense}>
          {isLoading ? <MoonLoader size={30} color="#f7f9ff" /> : "Save"}
        </button>
      </div>
    </div>
  );
}

export default AddExpense;
