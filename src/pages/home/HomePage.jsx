import { useAuth } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import { useState } from "react";
import "../../assets/css/home.css";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import { ReactComponent as Play } from "../../assets/svgs/play-button-svgrepo-com (1).svg";
import { ReactComponent as Join } from "../../assets/svgs/join.svg";
import { ReactComponent as Create } from "../../assets/svgs/plus.svg";
const HomePage = () => {
  const { socket } = useSocketContext();
  const [mode, setMode] = useState();

  function playOnline() {
    socket.emit("playOnline");
    setMode(1);
  }
  function openCreateRoom() {
    setMode(2);
  }
  function openJoinRoom() {
    setMode(3);
  }

  function createRoom(name, password, timeLimit) {
    socket.emit("createRoom", { name, password, timeLimit }, (callback) => {
      if (callback) setMode(1);
    });
  }
  function joinRoom(name, password) {
    socket.emit("joinRoom", { name, password });
  }

  function cancel() {
    window.location.reload();
  }

  return (
    <>
      <div className="home-wrapper">
        {mode === 1 ? (
          <>
            <div className="ideal-center">
              <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div>Searching for a player...</div>
              <div className="custom-btn" id="mrg-top">
                <input value="Cancel" type="button" onClick={cancel} />
              </div>
            </div>
          </>
        ) : mode === 2 ? (
          <CreateRoom cancel={cancel} createRoom={createRoom} />
        ) : mode === 3 ? (
          <JoinRoom cancel={cancel} joinRoom={joinRoom} />
        ) : (
          <>
            <div className="general-btn play-btn">
              <button onClick={playOnline}>Play online</button>
            </div>
            <div className="join-create-box">
              <div className="general-btn">
                <button onClick={openJoinRoom}>
                  <Join />
                </button>
              </div>
              <div className="general-btn">
                <button onClick={openCreateRoom}>
                  <Create />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
