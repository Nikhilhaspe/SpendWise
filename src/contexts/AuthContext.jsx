/* eslint-disable react/prop-types */
// library imports
import { createContext, useContext, useReducer } from "react";

// reducer
const INITIAL_STATE = {
  isLoggedIn: false,
  username: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        isLoggedIn: true,
        username: action.payload,
      };
    case "logout":
      return {
        isLoggedIn: false,
        username: null,
      };
    default:
      return state;
  }
}

const AuthContext = createContext();

function AuthContextProvider(props) {
  // props
  const { children } = props;

  // state
  const [{ isLoggedIn, username }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE
  );

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error(
      "AUTHENTICATION CONTEXT WAS USED OUTSIDE OF ITS+'S PROVIDER"
    );

  return context;
}

export default AuthContextProvider;
