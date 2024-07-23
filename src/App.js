import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import HomePage from "./pages/home/HomePage";
import RatingPage from "./pages/rating/RatingPage";
import HistoryPage from "./pages/history/HistoryPage";
import ProfilePage from "./pages/profile/profile";
import Callback from "./components/Callback";
import Header from "./components/Header";
import "./assets/css/app.css";
import GamePage from "./pages/game/GamePage";

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/callback" element={<Callback />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/rating" element={<RatingPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
