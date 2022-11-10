import "./App.css";
import React from "react";
import Login from "./login";
import Main from "./main";
import SignUp from "./signup";
import Login from './Login';
import { Route, Routes} from 'react-router-dom';
import Register from './Register';

function App() {
  return (
    <div id="wrapper">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/login' element={<Login />} /> 
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
