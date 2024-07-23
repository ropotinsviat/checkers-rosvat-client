import { useState, useEffect } from "react";

function PlayerTable({ white, black, inGame, turn, timeLimit, makeMove }) {
  const [whiteTime, setWhiteTime] = useState(0);
  const [blackTime, setBlackTime] = useState(0);
  const [whiteInterval, setWhiteInterval] = useState(null);
  const [blackInterval, setBlackInterval] = useState(null);

  useEffect(() => {
    setWhiteTime(white?.timer);
    setBlackTime(black?.timer);
    clearInterval(whiteInterval);
    clearInterval(blackInterval);

    const updateAndCheck = (prevTime) => {
      if (prevTime + 1 > timeLimit) {
        makeMove();
        clearInterval(whiteInterval);
        clearInterval(blackInterval);
      }
      return prevTime + 1;
    };

    if (inGame) {
      if (turn) {
        setWhiteInterval(
          setInterval(() => {
            setWhiteTime(updateAndCheck);
          }, 1000)
        );
      } else {
        setBlackInterval(
          setInterval(() => {
            setBlackTime(updateAndCheck);
          }, 1000)
        );
      }
    }
  }, [inGame, turn]);

  function formattedTime(time) {
    if (typeof time !== "number") return;
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  return (
    <div>
      <div className={`player-table ${inGame && turn && "turn"}`}>
        <div className="circle-wrapper">
          <div className="wc"></div>
        </div>
        <div className="player-nametime-wrapper">
          <div>{white?.name}</div>
          {inGame ? (
            <div>{`${formattedTime(whiteTime)}/${formattedTime(
              timeLimit
            )}`}</div>
          ) : (
            white && (white.timer === -1 ? "Ready" : "Not ready")
          )}
        </div>
      </div>
      <div className={`player-table ${inGame && !turn && "turn"}`}>
        <div className="circle-wrapper">
          <div className="bc"></div>
        </div>
        <div className="player-nametime-wrapper">
          <div>{black?.name}</div>
          {inGame ? (
            <div>{`${formattedTime(blackTime)}/${formattedTime(
              timeLimit
            )}`}</div>
          ) : (
            black && (black.timer === -1 ? "Ready" : "Not ready")
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayerTable;
