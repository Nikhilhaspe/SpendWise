// library imports
import { useReducer } from "react";
import { createContext, useContext } from "react";

// context
const ExpensesContext = createContext();
// reducer
const INITIAL_STATE = {
  expenses: [],
};
function reducer(state, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function ExpensesContextProvider(props) {
  // props
  // eslint-disable-next-line react/prop-types
  const { children } = props;

  // state
  const [{ expenses }, dispatch] = useReducer(reducer, INITIAL_STATE);

  console.log(expenses, dispatch);

  return <ExpensesContext.Provider>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpensesContext);

  if (!context)
    throw new Error("EXPENSES CONTEXT WAS USED OUTSIDE OF IT'S PROVIDER!");

  return context;
}

export default ExpensesContextProvider;
