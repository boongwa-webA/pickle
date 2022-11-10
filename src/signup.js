import React from "react";
import {
  firebaseAuth,
  createUserWithEmailAndPassword,
  fireStore,
} from "./Firebase";
import { useState, useEffect } from "react";
import { async } from "@firebase/util";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { Link, Route } from "react-router-dom";
import Login from "./login";
import "./Register.css";
import majorList from "./majorList";

const SignUp = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("  ");

  useEffect(() => {
    const majorDataList = document.getElementById("major");
    for (let i = 0; i < majorList.length; i++) {
      let tmpDataList = document.createElement("option");
      tmpDataList.innerText = majorList[i];
      majorDataList.appendChild(tmpDataList);
    }
  }, []);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "userEmail") {
      setRegisterEmail(value);
    } else if (name === "userPw") {
      setRegisterPassword(value);
    }
  };

  const register = async () => {
    console.log("시작");
    try {
      setErrorMsg("");
      const createdUser = await createUserWithEmailAndPassword(
        firebaseAuth,
        registerEmail,
        registerPassword
      );
      console.log(createdUser.user.uid);
      const uid = createdUser.user.uid;
      //user테이블에 사용자 정보 전송.(uid포함)
      createUser(uid);

      //   setRegisterEmail("");
      //   setRegisterPassword("");
    } catch (err) {
      console.log(err.code);
      switch (err.code) {
        case "auth/weak-password":
          setErrorMsg("비밀번호는 6자리 이상이어야 합니다");
          alert(errorMsg);
          break;
        case "auth/invalid-email":
          setErrorMsg("잘못된 이메일 주소입니다");
          break;
        case "auth/email-already-in-use":
          setErrorMsg("이미 가입되어 있는 계정입니다");
          break;
      }
    }
  };

  const createUser = async (uid) => {
    //사용할지안할지 모르지만 일단 적어둠
    // const [newUid, setUid] = useState("");

    console.log("정보저장하자");
    const newName = document.getElementById("userName").value;
    console.log(newName);
    const newEmail = document.getElementById("userEmail").value;
    const newUniv = document.getElementById("userUniv").value;
    const newMajor = document.getElementById("userMajor").value;
    const newGrade = document.getElementById("userGrade").value;
    const newNum = document.getElementById("userNum").value;
    const newUid = uid;

    const userCollectionRef = collection(fireStore, "User");
    // const userCollectionRef = collection(fireStore, "User", newUid);

    await setDoc(doc(fireStore, "User", newUid), {
      grade: newGrade,
      major: newMajor,
      stdNum: newNum,
      uid: newUid,
      univ: newUniv,
      userEmail: newEmail,
      userName: newName,
    });
  };
  return (
    <div className="page">
      <div className="maincontent">
        <div className="title">PICKLES</div>
        <div className="inputcontent">
          <div className="inputWrap">
            <label htmlFor="userName">이름 </label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="inputBox"
              placeholder="이름을 입력해주세요."
            />
          </div>
          <div className="inputWrap">
            <label htmlFor="userId">이메일</label>
            <input
              className="inputBox"
              type="email"
              placeholder="아이디를 입력해주세요.(이메일 형식)"
              id="userEmail"
              name="userEmail"
              value={registerEmail}
              onChange={onChange}
            />
          </div>
          <div className="inputWrap">
            <label htmlFor="userPw">비밀번호</label>
            <input
              className="inputBox"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              id="userPw"
              name="userPw"
              value={registerPassword}
              onChange={onChange}
            />
          </div>
          <div className="inputWrap">
            <label htmlFor="pwCheck">비밀번호 확인</label>
            <input
              className="inputBox"
              placeholder="비밀번호를 확인해주세요"
              type="password"
              id="userPwCk"
              name="userPwCk"
            />
          </div>
          <div className="inputWrap">
            <label htmlFor="univ">학교</label>
            <input
              className="inputBox"
              type="text"
              placeholder="학교를 입력해주세요."
              id="userUniv"
              name="userUniv"
            />
          </div>
          <div className="inputWrap">
            <label htmlFor="grade">학년</label>
            <input
              className="inputBox"
              type="text"
              list="grade"
              placeholder="학년을 입력해주세요."
              id="userGrade"
              name="userGrade"
            />
            <datalist id="grade">
              <option>1학년</option>
              <option>2학년</option>
              <option>3학년</option>
              <option>4학년</option>
            </datalist>
          </div>

          <div className="inputWrap">
            <label htmlFor="major">학과</label>
            <input
              className="inputBox"
              id="userMajor"
              name="userMajor"
              type="text"
              list="major"
              placeholder="학과를 입력해주세요."
            />
            <datalist id="major"></datalist>
          </div>

          <div className="inputWrap">
            <label htmlFor="stdNum">학번</label>
            <input
              className="inputBox"
              id="userNum"
              name="userNum"
              type="text"
              placeholder="학번을 입력해주세요."
            />
          </div>
          <div className="btn_group">
            <Link to="/" className="join">
              <button className="cancel">취소하기</button>
            </Link>
            <button className="join" id="signUp" onClick={() => register()}>
              가입하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
