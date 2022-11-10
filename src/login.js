import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  firebaseAuth,
  signInWithEmailAndPassword,
  fireStore,
} from "./Firebase";

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

      //   setUser(curUserInfo.user);
    } catch (err) {
      //   setIsAppropriate(false);
      console.log(err.code);
      /*
            입력한 아이디가 없을 경우 : auth/user-not-found.
            비밀번호가 잘못된 경우 : auth/wrong-password.
            */
    }
  };
  return (
    <div id="wrapper">
      log in 화면
      <div id="login">
        <input
          type="text"
          id="userEmail"
          name="userEmail"
          placeholder="이메일"
          value={email}
          onChange={onChange}
        ></input>
        <input
          type="password"
          id="userPw"
          name="userPw"
          placeholder="비밀번호"
          value={password}
          onChange={onChange}
        ></input>
        <button onClick={() => login()}>로그인</button>
      </div>
      <Link to="/main">
        <button>mainpage</button>
      </Link>
      <Link to="/signup">
        <button>회원가입</button>
      </Link>
    </div>
  );
};

export default Login;
