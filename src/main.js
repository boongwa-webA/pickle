import React, { useCallback, useId, useRef, useState } from "react";
import { fireStore } from "./Firebase";
import { useEffect } from "react";
import { collection, Firestore, getDocs } from "firebase/firestore";
import { doc, query, where } from "firebase/firestore";
import { async } from "@firebase/util";
import userEvent from "@testing-library/user-event";

// function Lecture({ lectureName }) {
//   return <span>{lectureName}</span>;
// }

const Main = () => {
  const $main = document.querySelector("#main");

  const lectureQuery = query(
    collection(fireStore, "lecture"),
    where("prof", "==", "김수균")
  );

  useEffect(() => {
    const getUsers = async () => {
      let lecNames = new Array();
      console.log(lecNames.length);
      const data = await getDocs(lectureQuery);
      console.log(data);
      data.forEach((doc) => {
        console.log(doc.data());
        lecNames.push(doc.data().lecName);
      });
      console.log(lecNames.length);
      showLecture(lecNames);
    };
    getUsers();
  }, []);

  //강의 목록 보여주는 함수
  const showLecture = (name) => {
    const $lectureList = document.querySelector("#lectureList");
    console.log("for문 시작 전");
    for (let i = 0; i < name.length; i++) {
      console.log("들어왔땁");
      console.log(name[i]);
      let lecItem = document.createElement("div");
      console.log("div");
      let lecName = document.createElement("p");
      console.log("p");
      let lecNameTxt = document.createTextNode(name[i]);
      console.log("name");

      lecName.appendChild(lecNameTxt);
      console.log("app lecName");
      lecItem.appendChild(lecName);
      console.log("app lecItem");

      $lectureList.appendChild(lecItem);
      console.log("app leclist");

      //   $main.appendChild($lectureList);
    }
  };

  return (
    <div id="main">
      mainpage
      <div id="lectureList">
        {/* {lecNames.map((lecture) => (
          <Lecture name={lecture.lectureName} />
        ))} */}
      </div>
    </div>
  );
};

export default Main;
