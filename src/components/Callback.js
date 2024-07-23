import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api";

const Callback = () => {
  const called = useRef(false);
  const { checkLoginState, loggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (!loggedIn) {
        try {
          if (called.current) return;
          called.current = true;
          const res = await api.get(
            `${process.env.REACT_APP_SERVER_URL}/auth/token${window.location.search}`
          );
          localStorage.setItem("token", res.data.token);
          window.location.assign(window.location.origin);
        } catch (err) {
          console.error(err);
        }
      }
      navigate("/");
    })();
  }, [checkLoginState, loggedIn, navigate]);
  return <></>;
};

export default Callback;
