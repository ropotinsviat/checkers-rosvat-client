import { useState } from "react";
import "../../assets/css/create-join-room.css";

const JoinRoom = ({ joinRoom, cancel }) => {
  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");

  const handleJoinRoom = () => {
    joinRoom(roomName, roomPassword);
  };

  return (
    <div className="main-box">
      <div className="txt-bar">
        <input
          type="text"
          placeholder="Enter room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </div>
      <div className="txt-bar">
        <input
          type="text"
          placeholder="Enter room password"
          value={roomPassword}
          onChange={(e) => setRoomPassword(e.target.value)}
        />
      </div>
      <div className="btns-bar">
        <div className="custom-btn">
          <input value="Join room" type="button" onClick={handleJoinRoom} />
        </div>
        <div className="custom-btn">
          <input value="Cancel" type="button" onClick={cancel} />
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
