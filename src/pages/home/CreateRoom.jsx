import { useState } from "react";
import "../../assets/css/create-join-room.css";

const CreateRoom = ({ createRoom, cancel }) => {
  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [selectedTime, setSelectedTime] = useState("3 min");

  const handleSelectChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleCreateRoom = () => {
    const timeInSeconds = convertToSeconds(selectedTime);
    createRoom(roomName, roomPassword, timeInSeconds);
  };

  const convertToSeconds = (time) => {
    const [value, unit] = time.split(" ");
    if (unit === "min") return parseInt(value) * 60;
    if (unit === "hour") return parseInt(value) * 3600;
    return 0;
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
        <div>Time limit: </div>
        <select value={selectedTime} onChange={handleSelectChange}>
          <option>3 min</option>
          <option>5 min</option>
          <option>10 min</option>
          <option>15 min</option>
          <option>30 min</option>
          <option>1 hour</option>
        </select>
      </div>
      <div className="btns-bar">
        <div className="custom-btn">
          <input value="Create room" type="button" onClick={handleCreateRoom} />
        </div>
        <div className="custom-btn">
          <input value="Cancel" type="button" onClick={cancel} />
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
