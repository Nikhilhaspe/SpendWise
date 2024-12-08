/* eslint-disable react/prop-types */
// library imports
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// auth context
import { useAuth } from "../../contexts/AuthContext";

function AuthProtection(props) {
  // RRD
  const navigate = useNavigate();

  // props
  const { children } = props;

  // auth context
  const { isLoggedIn } = useAuth();

  // effects
  useEffect(
    function () {
      if (!isLoggedIn) navigate("/");
    },
    [isLoggedIn, navigate]
  );

  if (isLoggedIn) return children;
  else return null;
}

export default AuthProtection;
