/* eslint-disable react/prop-types */

// library imports
import { createContext, useContext, useReducer } from "react";

// reducer
const INITIAL_STATE = {
  theme: "dark",
};

function reducer(state, action) {
  switch (action.type) {
    case "toggleTheme":
      return {
        ...state,
        theme: state.theme === "dark" ? "light" : "dark",
      };
    default:
      return state;
  }
}

// context provider
const ThemeContext = createContext();

function ThemeContextProvider(props) {
  // state
  const [{ theme }, dispatch] = useReducer(reducer, INITIAL_STATE);

  // props
  const { children } = props;

  return (
    <ThemeContext.Provider value={{ theme, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
}

// custom hook for context use
export function useTheme() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext)
    throw new Error("Theme Context Was Used Outside Of It's Provider");

  return themeContext;
}

export default ThemeContextProvider;
