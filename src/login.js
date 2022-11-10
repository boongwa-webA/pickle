import React from "react";
import { Link } from "react-router-dom";
import {
  firebaseAuth,
  signInWithEmailAndPassword,
  fireStore,
} from "./Firebase";
import { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPw") {
      setPassword(value);
    }
  };

  const login = async () => {
    try {
      const curUserInfo = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      console.log(curUserInfo);
      document.location.href = "/main";
    } catch (err) {
      console.log(err.code);

      // 입력한 아이디가 없을 경우 : auth/user-not-found.
      // 비밀번호가 잘못된 경우 : auth/wrong-password.
    }
  };

  return (
    <div className="wrapper">
      <div className="loginBox">
        <div className="title">PICKLES</div>
        <div className="input">
          <input
            type="email"
            className="userInput inputEmail"
            id="userEmail"
            name="userEmail"
            placeholder="이메일"
            value={email}
            onChange={onChange}
          ></input>
          <input
            type="password"
            className="userInput inputPw"
            id="userPw"
            name="userPw"
            placeholder="비밀번호"
            value={password}
            onChange={onChange}
          ></input>
        </div>
        <div className="buttonBox">
          <button className="login" onClick={() => login()}>
            로그인
          </button>
          <Link to="/signup" className="signup">
            <button className="signup">회원가입</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
