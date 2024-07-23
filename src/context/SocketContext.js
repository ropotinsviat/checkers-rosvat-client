import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SERVER_URL, {
      auth: { token: localStorage.getItem("token") },
    });

    setSocket(socket);

    socket.on("setPlayerToken", (data) => {
      localStorage.setItem("playerToken", data.playerToken);
      window.location.reload();
    });
    socket.on("alert", (data) => data && alert(data.message));
    return () => socket.close();
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
