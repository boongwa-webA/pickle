/*
import React from "react";
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
*/


import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

//예시 데이터
const User = {
    email: 'test@example.com',
    pw: 'test1234@'
} 

function Login() {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);
    
    const handleEmail = (e) => {
        setEmail(e.target.value);
        // eslint-disable-next-line
        const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i; //JS 정규표현식
        if (regex.test(e.target.value)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    };

    const handlePw = (e) => {
        setPw(e.target.value);
        const regex =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/; //JS 정규표현식
        if (regex.test(e.target.value)) {
          setPwValid(true);
        } else {
          setPwValid(false);
        }
    };

    //로그인 버튼을 눌렀을 때
    const onClickConfirmButton = () => {
        if(email === User.email && pw === User.pw) {
            alert('로그인에 성공하였습니다.');
        }
        else {
            alert('아이디와 비밀번호를 확인해주세요.');
        }
    }

    useEffect(() => {
        if(emailValid && pwValid) {
          setNotAllow(false);
          return;
        }
        setNotAllow(true);
    }, [emailValid, pwValid]); //email과 pw가 바뀔 때마다 버튼에서 활성

    return (
        <div className="page">
            <div className="content">
                <div className="maincotent" >
                    <div className="titleWrap">
                        PICKLES
                    </div>
                    <div className="contentWrap">
                        
                        <div className="inputWrap">
                            <input className="inputID" type="email" value={email} onChange={handleEmail} placeholder="이메일을 입력해주세요."/>
                        </div>
                        
                        <div className="errorMessage">
                            {!emailValid && email.length > 0 && (
                                <div>올바른 이메일을 입력해주세요.</div>
                                
                            )}
                        </div>

                        <div  style={{marginTop: "26px"}} className="inputWrap">
                            <input className="inputPW" type="password" value={pw}  onChange={handlePw} placeholder="비밀번호를 입력해주세요."/>
                        </div>

                        <div className="errorMessage">
                            {!pwValid && pw.length > 0 && (
                            <div>올바른 비밀번호를 입력해주세요.</div>
                            )}
                        </div>

                        <div>
                            <button onClick={onClickConfirmButton} disabled={notAllow} className="login" type="submit">
                                로그인
                            </button>
                            
                        </div>
                        <div>
                            <Link to="/register">회원가입</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
