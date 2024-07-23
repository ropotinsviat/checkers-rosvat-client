import "../assets/css/header.css";
import "../assets/css/app.css";
import { useState, useEffect } from "react";
import { ReactComponent as Hamburger } from "../assets/svgs/burger1.svg";
import { ReactComponent as Home } from "../assets/svgs/home1.svg";
import { ReactComponent as Cup } from "../assets/svgs/cup.svg";
import { ReactComponent as History } from "../assets/svgs/history.svg";
import { ReactComponent as Profile } from "../assets/svgs/profile.svg";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import GoogleButton from "react-google-button";
import { ReactComponent as Cancel } from "../assets/svgs/x-thin.svg";

function Header() {
  const [display, setDisplay] = useState("none");

  const handleLogin = async () => {
    try {
      const {
        data: { url },
      } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/url`);
      window.location.assign(url);
    } catch (err) {
      console.error(err);
    }
  };

  const { loggedIn, userName } = useAuth();

  function navigate(url) {
    window.location.assign(`${window.location.origin}/${url}`);
  }
  if (window.location.href === `${window.location.origin}/game`) return <></>;
  return (
    <>
      <div className="header-wrapper">
        <div className="header">
          <div className="hamburger-wrapper first-hamburger">
            <Hamburger
              style={{
                fill: "white",
                width: "22px",
                height: "22px",
              }}
            />
          </div>
          <div className="logo-wrapper madimi-one-regular">Checkers Rosvat</div>

          <div className="side-bar">
            <nav>
              <div onClick={() => navigate("")}>
                <Home
                  style={{ fill: "white", width: "20px", height: "20px" }}
                />
                Home
              </div>
              {loggedIn && (
                <div onClick={() => navigate("profile")}>
                  <Profile
                    style={{ fill: "white", width: "20px", height: "20px" }}
                  />
                  Profile
                </div>
              )}
              <div onClick={() => navigate("rating")}>
                <Cup style={{ fill: "white", width: "20px", height: "20px" }} />
                Ratings
              </div>
              {loggedIn && (
                <div onClick={() => navigate("history")}>
                  <History
                    style={{ fill: "white", width: "20px", height: "20px" }}
                  />
                  Match history
                </div>
              )}
            </nav>
            {!loggedIn && (
              <div className="login-wrapper">
                <div className="custom-btn">
                  <input
                    value="Log in"
                    type="button"
                    onClick={() => setDisplay("block")}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="overlay"
        style={{ display: display }}
        onClick={() => setDisplay("none")}
      ></div>
      <div className="middle-bar pic-auth" style={{ display: display }}>
        <div className="cancel-btn" onClick={() => setDisplay("none")}>
          <Cancel style={{ fill: "white", width: "28px", height: "28px" }} />
        </div>
        <div className="infos">
          <h2>Sign in to:</h2>
          <li>Personalize profile data</li>
          <li>Join ratings system</li>
          <li>Store match history</li>
          <li>Ensure gaming security</li>
        </div>
        <div className="google-btn-wrapper">
          <GoogleButton
            label="Continue with Google"
            type="light"
            onClick={handleLogin}
          />
        </div>
      </div>
    </>
  );
}

export default Header;
