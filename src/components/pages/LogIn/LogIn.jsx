// library imports
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoonLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

// css module
import styles from "./LogIn.module.css";

// indexed db queries for user auth
import { login } from "../../../AuthDbOps";
import { isBlankOrEmpty } from "../../../utilities";

function LogIn() {
  // state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // event handlers
  function handleFormData(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleFormSubmit() {
    try {
      setIsLoading(true);

      if (validatePayload()) return;

      const loginStatus = await login(formData.username, formData.password);

      if (loginStatus) {
        toast.success("Login Successfull");
      } else {
        toast.error("Invalid Username or Password");
      }
    } catch (error) {
      toast.error(
        error.message ||
          "Something went wrong while creating account, try again!"
      );
    } finally {
      setIsLoading(false);
    }
  }

  // utility functions
  function validatePayload() {
    if (isBlankOrEmpty(formData.username)) {
      toast.error("Username cannot be blank");
      return true;
    }

    if (isBlankOrEmpty(formData.password)) {
      toast.error("Password cannot be blank");
      return true;
    }

    return false;
  }

  return (
    <div className={styles.loginPageContainer}>
      <ToastContainer position="top-center" theme="dark" />

      <div className={styles.formHeader}>
        <h1>Log in to your account</h1>
      </div>

      <div className={styles.formWrapper}>
        <div className={styles.row}>
          <input
            type="text"
            name="username"
            placeholder="Enter Your Username"
            value={formData.username}
            onChange={handleFormData}
          />
        </div>
        <div className={styles.row}>
          <input
            type="password"
            name="password"
            placeholder="Set New Password"
            value={formData.password}
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

export default LogIn;
