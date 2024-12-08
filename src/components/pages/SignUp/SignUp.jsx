// library imports
import { useReducer } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoonLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

// css module
import styles from "./SignUp.module.css";
import { isBlankOrEmpty, isValidEmail } from "../../../utilities";

// indexed db queries for user auth
import { doesUserExist, initUserDb } from "../../../AuthDbOps";

// reducer
const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "fillFormData":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "toggleLoading":
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    default:
      return state;
  }
}

function SignUp() {
  // RRD
  const navigate = useNavigate();

  // state
  const [{ username, email, password, confirmPassword, isLoading }, dispatch] =
    useReducer(reducer, INITIAL_STATE);

  // event handlers
  function handleFormData(event) {
    dispatch({
      type: "fillFormData",
      payload: { name: event.target.name, value: event.target.value },
    });
  }

  async function handleFormSubmit() {
    try {
      dispatch({
        type: "toggleLoading",
      });

      let payload = {
        username,
        email,
        password,
        confirmPassword,
      };

      if (validatePayload(payload)) {
        return;
      }

      const alreadyExists = await doesUserExist(username);

      console.log(alreadyExists);

      if (alreadyExists) {
        toast.error(
          "Username already exists, kindly choose the different username!"
        );
        return;
      } else {
        initUserDb(username, password);
        toast.success("Signed Up Successfully!");
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error.message ||
          "Something went wrong while creating account, try again!"
      );
    } finally {
      dispatch({
        type: "toggleLoading",
      });
    }
  }

  // utility functions
  function validatePayload(payload) {
    if (isBlankOrEmpty(payload.username)) {
      toast.error("Username cannot be blank!");
      return true;
    }

    if (isBlankOrEmpty(payload.email)) {
      toast.error("Email cannot be blank!");
      return true;
    }

    if (!isValidEmail(payload.email)) {
      toast.error("Please enter valid email!");
      return true;
    }

    if (isBlankOrEmpty(payload.password)) {
      toast.error("Password cannot be blank!");
      return true;
    }

    if (isBlankOrEmpty(payload.confirmPassword)) {
      toast.error("Confirm password cannot be blank!");
      return true;
    }

    if (payload.password !== payload.confirmPassword) {
      toast.error("Password and Confirm Password must be same!");
      return true;
    }

    return false;
  }

  return (
    <div className={styles.signUpPageContainer}>
      <ToastContainer position="top-center" theme="dark" />

      <div className={styles.formHeader}>
        <h1>Please Setup Your New Account</h1>
      </div>

      <div className={styles.formWrapper}>
        <div className={styles.row}>
          <input
            type="text"
            name="username"
            placeholder="Enter Your Username"
            value={username}
            onChange={handleFormData}
          />
        </div>
        <div className={styles.row}>
          <input
            type="text"
            name="email"
            placeholder="Enter Your Email Address"
            value={email}
            onChange={handleFormData}
          />
        </div>
        <div className={styles.row}>
          <input
            type="text"
            name="password"
            placeholder="Set New Password"
            value={password}
            onChange={handleFormData}
          />
        </div>
        <div className={styles.row}>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Your Password"
            value={confirmPassword}
            onChange={handleFormData}
          />
        </div>
      </div>
      <div className={styles.row}>
        <button onClick={handleFormSubmit} className={styles.subBtn}>
          {isLoading ? <MoonLoader size={30} color="#f7f9ff" /> : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default SignUp;
