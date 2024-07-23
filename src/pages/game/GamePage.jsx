import { useState, useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import Board from "./Board";
import PlayerTable from "./PlayerTable";
import "../../assets/css/game.css";

const GamePage = () => {
  const { socket } = useSocketContext();
  const [role, setRole] = useState("viewer");
  const [white, setWhite] = useState(null);
  const [black, setBlack] = useState(null);
  const [board, setBoard] = useState([[]]);
  const [turn, setTurn] = useState(true);
  const [movesInfo, setMovesInfo] = useState({ moves: [] });
  const [timeLimit, setTimeLimit] = useState(666);
  const inGame = white && black && white.timer !== null && black.timer !== null;

  const [ready, setReady] = useState("Ready");

  const setInfo = (data) => {
    console.dir(data, { depth: null });

    setBoard(data.board);
    setWhite(data.white);
    setBlack(data.black);
    setTimeLimit(data.timeLimit);
    setMovesInfo(data.movesInfo);
    setTurn(data.turn === 1);

    if (data.hasOwnProperty("aftermath")) {
      setWhite(null);
      setBlack(null);

      setTimeout(() => {
        alert("One of the users hasn't confirmed the proposal to play again");
        localStorage.removeItem("playerToken");
        window.location.assign(window.location.origin);
      }, 11000);

      if (
        window.confirm(
          `${data.aftermath}\nWould you like to play again with this player?`
        )
      ) {
        socket.emit("replay");
      } else {
        localStorage.removeItem("playerToken");
        window.location.assign(window.location.origin);
      }
    }
  };

  const clickReady = () => {
    if (ready === "Ready") {
      socket.emit("ready", { ready: true });
      setReady("Not ready");
    } else {
      socket.emit("ready", { ready: false });
      setReady("Ready");
    }
  };

  const clickLeave = () => {
    if (
      !inGame ||
      window.confirm(
        "Are you sure you want to leave? It means your instant lost"
      )
    ) {
      localStorage.removeItem("playerToken");
      window.location.reload();
    }
  };

  const surrender = () => {
    if (window.confirm("Are you sure you want to surrender?"))
      socket.emit("move", { surrender: true });
  };
  const proposeDraw = () => {
    socket.emit("move", { draw: true });
  };
  const makeMove = (i1, j1, i2, j2) =>
    socket.emit("move", {
      move: { from: [i1, j1], to: [i2, j2] },
    });

  useEffect(() => {
    if (socket) {
      socket.emit(
        "join",
        { playerToken: localStorage.getItem("playerToken") },
        (data) => {
          if (data && data.error) {
            localStorage.removeItem("playerToken");
            window.location.assign(`${window.location.origin}`);
          } else setRole(data.role);
        }
      );

      const handleDraw = (callback) => {
        if (window.confirm("Opponent has proposed a draw. Do you accept?"))
          callback(true);
      };
      const handleGameData = (data) => setInfo(data);

      socket.on("getGameData", handleGameData);
      socket.on("draw", handleDraw);

      return () => {
        socket.off("getGameData", handleGameData);
        socket.on("draw", handleDraw);
      };
    }
  }, [socket]);

  return (
    <>
      <div className="felix">
        <Board
          board={board}
          setBoard={setBoard}
          turn={turn}
          movesInfo={movesInfo}
          role={role}
          makeMove={makeMove}
        />
        <div className="side-panel">
          <PlayerTable
            white={white}
            black={black}
            inGame={inGame}
            turn={turn}
            timeLimit={timeLimit}
            makeMove={makeMove}
          />
          <div className="button-bar">
            {!inGame && (
              <div className="custom-btn same-wdth-btn">
                <input value={ready} onClick={clickReady} type="button" />
              </div>
            )}
            {inGame && (
              <div className="custom-btn same-wdth-btn">
                <input value="Surrender" onClick={surrender} type="button" />
              </div>
            )}
            {inGame && (
              <div className="custom-btn same-wdth-btn">
                <input
                  value="Propose a draw"
                  onClick={proposeDraw}
                  type="button"
                />
              </div>
            )}
            <div className="custom-btn same-wdth-btn">
              <input value="Leave" onClick={clickLeave} type="button" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePage;
