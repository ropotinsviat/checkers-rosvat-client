import { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/rating-history.css";

const RatingPage = () => {
  const [rating, setRating] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/rating`);
      setRating(res.data.rating);
    })();
  }, []);

  return (
    <div className="container">
      <div className="table-header">
        <div className="cell">#</div>
        <div className="cell">Player</div>
        <div className="cell">Rating</div>
        <div className="cell">Won</div>
        <div className="cell">Draw</div>
        <div className="cell">Lost</div>
      </div>
      {rating.map((player, index) => (
        <div key={index} className="table-row">
          <div className="cell">{index + 1}</div>
          <div className="cell img-name-box">
            {/*<img src={player.image} />*/}
            <span className="myText">{player.name}</span>
          </div>
          <div className="cell">{player.score}</div>
          <div className="cell score-won">{player.wins}</div>
          <div className="cell score-draw">{player.draws}</div>
          <div className="cell score-lost">{player.losses}</div>
        </div>
      ))}
    </div>
  );
};

export default RatingPage;
