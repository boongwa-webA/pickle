import "./App.css";
import React from "react";
import Login from "./login";
import Main from "./main";
import SignUp from "./signup";
import Mypage from "./mypage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div id="wrapper">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </div>
  );
}

export default App;
