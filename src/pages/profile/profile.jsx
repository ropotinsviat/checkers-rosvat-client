import { useState, useEffect } from "react";
import api from "../../api.js";

const ProfilePage = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [score, setScore] = useState();
  const [show, setShow] = useState();

  function logout() {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      window.location.assign(window.location.origin);
    }
  }
  async function setNameReq() {
    await api.get(`${process.env.REACT_APP_SERVER_URL}/setName`, {
      params: { newName: name },
    });
  }

  useEffect(() => {
    (async () => {
      const res = await api.get(`${process.env.REACT_APP_SERVER_URL}/userData`);
      setName(res.data.userData.name);
      setEmail(res.data.userData.email);
      setScore(res.data.userData.score);
    })();
  }, []);

  return (
    <div className="container prof">
      <div className="inf">
        <div className="fst-el">Email:</div>
        <div>{email}</div>
      </div>

      <div className="inf">
        <div className="fst-el"> Name:</div>
        <div className="txt-bar">
          <div>
            <input
              id="shrt"
              type="text"
              value={name}
              placeholder="Enter name"
              onChange={(e) => {
                setName(e.target.value);
                setShow(true);
              }}
            />
          </div>
        </div>
        {show && (
          <div className="custom-btn">
            <input value="Save" type="button" onClick={setNameReq} />
          </div>
        )}
      </div>

      <div className="inf">
        <div className="fst-el">Rating:</div>
        <div>{score}</div>
      </div>

      <div className="logout">
        <div className="custom-btn">
          <input value="Log out" type="button" onClick={logout} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
