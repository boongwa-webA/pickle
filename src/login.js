import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div id="wrapper">
      log in 화면
      <div id="login">
        <input
          type="text"
          id="userID"
          name="userID"
          placeholder="아이디"
        ></input>
        <input
          type="password"
          id="userPw"
          name="userPws"
          placeholder="비밀번호"
        ></input>
        <button>로그인</button>
      </div>
      <Link to="/main">
        <button>mainpage</button>
      </Link>
      <Link to="./signup">
        <button>회원가입</button>
      </Link>
    </div>
  );
};

export default Login;
