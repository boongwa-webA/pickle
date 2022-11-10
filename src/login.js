import React from "react";
import { Link } from "react-router-dom";
import {
  firebaseAuth,
  signInWithEmailAndPassword,
  fireStore,
} from "./Firebase";
import { useState } from "react";

const Login = () => {
  //내코드
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
    <div className="page">
      <div className="content">
        <div className="maincotent">
          <div className="titleWrap">PICKLES</div>
          <div className="contentWrap">
            <div className="inputWrap">
              <input
                type="email"
                className="inputEmail"
                id="userEmail"
                name="userEmail"
                placeholder="이메일"
                value={email}
                onChange={onChange}
              ></input>
            </div>

            <div style={{ marginTop: "26px" }} className="inputWrap">
              <input
                type="password"
                className="inputPw"
                id="userPw"
                name="userPw"
                placeholder="비밀번호"
                value={password}
                onChange={onChange}
              ></input>
            </div>

            <div>
              <button className="login" onClick={() => login()}>
                로그인
              </button>
            </div>
            <div>
              <Link to="/main">
                <button>mainpage</button>
              </Link>
              <Link to="/signup">
                <button>회원가입</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
