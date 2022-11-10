import React from "react";
import {
  firebaseAuth,
  createUserWithEmailAndPassword,
  fireStore,
} from "./Firebase";
import { useState } from "react";
import { async } from "@firebase/util";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";

const SignUp = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("  ");

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
    <div>
      회원가입 화면
      <div id="signupInfo">
        <input
          type="text"
          id="userName"
          name="userName"
          placeholder="이름"
        ></input>
        <input
          type="text"
          id="userEmail"
          name="userEmail"
          placeholder="이메일"
          value={registerEmail}
          onChange={onChange}
        ></input>
        <input
          type="password"
          id="userPw"
          name="userPw"
          placeholder="비밀번호"
          value={registerPassword}
          onChange={onChange}
        ></input>
        <input
          type="password"
          id="userPwCk"
          name="userPwCk"
          placeholder="비밀번호 확인"
        ></input>
        <input
          type="text"
          id="userUniv"
          name="userUniv"
          placeholder="학교"
        ></input>
        <input
          type="text"
          id="userMajor"
          name="userMajor"
          placeholder="학과"
        ></input>
        <input
          type="text"
          id="userGrade"
          name="userGrade"
          placeholder="학년"
        ></input>
        <input
          type="text"
          id="userNum"
          name="userNum"
          placeholder="학번"
        ></input>
        <button id="signUp" onClick={() => register()}>
          회원가입
        </button>
      </div>
    </div>
  );
};

export default SignUp;
