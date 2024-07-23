import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from "react";
import api from "../api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [userName, setUserName] = useState("");

  const checkLoginState = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        `${process.env.REACT_APP_SERVER_URL}/auth/logged_in`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { loggedIn: logged_in, newToken, user } = response.data;
      localStorage.setItem("token", newToken);
      setLoggedIn(logged_in);
      if (logged_in) setUserName(user.name);

      if (
        localStorage.getItem("playerToken") &&
        window.location.href != `${window.location.origin}/game`
      )
        window.location.assign(`${window.location.origin}/game`);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const initializeSocket = async () => {
      await checkLoginState();
    };

    initializeSocket();
  }, [checkLoginState]);

  return (
    <AuthContext.Provider value={{ loggedIn, checkLoginState, userName }}>
      {children}
    </AuthContext.Provider>
  );
};
