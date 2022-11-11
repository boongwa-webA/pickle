import React, { useCallback, useId, useRef, useState } from "react";
import { fireStore } from "./Firebase";
import { useEffect } from "react";
import { collection, Firestore, getDocs, setDoc } from "firebase/firestore";
import { doc, query, where } from "firebase/firestore";
import styled, { css } from "styled-components";
import "./main.css";
import { async } from "@firebase/util";
import userEvent from "@testing-library/user-event";
import { getAuth } from "firebase/auth";
import { tab } from "@testing-library/user-event/dist/tab";

const Main = () => {
  let saveSubject = [];
  let saveTime = [];
  let saveDay = [];
  let uid;

  const lectureQuery = query(
    collection(fireStore, "lecture"),
    where("essential", "==", "전공"),
    where("dep", "==", "공과대학 소프트웨어학부 컴퓨터공학전공")
  );

  const essLectureQuery = query(
    collection(fireStore, "lecture"),
    where("essential", "==", "전공필수"),
    where("dep", "==", "공과대학 소프트웨어학부 컴퓨터공학전공")
  );

  //기초교양 과목 쿼리
  //전공과목 탐색 쿼리

  useEffect(() => {
    console.log("!!!!!!!!!!!!!!!");
    const auth = getAuth();
    uid = auth.currentUser.uid;
    // console.log(auth.currentUser.uid);
    const getLectureList = async () => {
      const data = await getDocs(lectureQuery);
      data.forEach((doc) => {
        showLectureItem(doc.data());
        console.log(doc.data());
      });
    };
    getLectureList();
    initTable();
    // initProfile();
  }, []);

  // const getProfileQuery = query(
  //   collection(fireStore, "User"),
  //   where("uid", "==", uid)
  // );

  //프로필 띄우기
  // const initProfile = async () => {
  //   let userName = document.getElementById("userName");
  //   let userMajor = document.getElementById("userMajor");
  //   let userGrd = document.getElementById("userGrd");
  //   let userNum = document.getElementById("userNum");

  //   const profile = await getDocs(getProfileQuery);
  //   profile.forEach((doc) => {
  //     userName.innerHTML = doc.data().userName;
  //     userMajor.innerHTML = doc.data().major;
  //     userGrd.innerHTML = doc.data().grade;
  //     userNum.innerHTML = doc.data().stdNum;
  //   });
  // };

  //시간표 바탕 그리기
  const initTable = () => {
    const tableWrapper = document.getElementById("tableWrapper");
    tableWrapper.innerHTML = "";
    const days = ["time", "월", "화", "수", "목", "금"];
    for (let i = 1; i < 10; i++) {
      let row = document.createElement("div");
      row.setAttribute("class", "row");
      row.setAttribute("id", "row" + i);
      for (let j = 0; j < 6; j++) {
        let col = document.createElement("div");
        if (j == 0) {
          col.innerText = "" + i + "교시";
        }
        col.setAttribute("class", "col");
        col.setAttribute("id", days[j] + "" + i);
        row.appendChild(col);
      }
      tableWrapper.appendChild(row);
    }
  };

  //시간표 추가
  const drawTable = (id, subject) => {
    let chop = id.split(" ");
    let cTime = [];
    let cDay = [];
    for (let i = 0; i < chop.length; i++) {
      if (chop[i][0] === "[") {
        let last = chop[i].length - 1;
        if (chop[i][last] != "]") {
          cTime.push(chop[i][last]);
          cDay.push(chop[i][last - 1]);
        }
      } else {
        cTime.push(chop[i][1]);
        cDay.push(chop[i][0]);
      }
    }

    console.log(cDay);
    console.log(cTime);

    let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    for (let i = 0; i < cDay.length; i++) {
      console.log(cDay[i] + cTime[i]);
      let dayDiv = document.getElementById(cDay[i] + cTime[i]);

      saveSubject.push(subject);
      saveTime.push(cTime[i]);
      saveDay.push(cDay[i]);

      dayDiv.innerText = subject;
      dayDiv.style.backgroundColor = color;
    }
  };

  //시간표 저장
  const saveTable = async () => {
    const saveTimeTable = collection(fireStore, "Timetable");

    await setDoc(doc(fireStore, "Timetable", uid), {
      day: saveDay,
      lecName: saveSubject,
      time: saveTime,
      uid: uid,
    });
  };

  const getEssSubject = async () => {
    const essData = await getDocs(essLectureQuery);
    essData.forEach((doc) => {
      showLectureItem(doc.data());
      console.log(doc.data());
    });
  };

  //카테고리 클릭
  const cateegoryClick = (categoryId) => {
    if (categoryId === "category_1") {
      console.log(categoryId + "전공");
      getEssSubject();
      console.log("함수 실행 잘 됨?");
    } else if (categoryId === "category_2") {
      console.log(categoryId + "교양");
    } else if (categoryId === "category_3") {
      console.log(categoryId + "전필");
    }
  };

  // 강의 목록 보여주는 함수
  const showLectureItem = (item) => {
    let itemName = item.lecName;
    let itemProf = item.prof;
    let itemInfo = item.lecInfo;
    let itemGrd = item.grade;
    let itemEss = item.essential;
    let itemHjum = item.hakjum;
    let itemNum = item.lecNum;

    const $lectureList = document.querySelector(".lecture_list");
    //한 강의정보 전체 감쌀 div
    let lecItem = document.createElement("div");
    lecItem.setAttribute("class", "lecture_item");

    //강의명 담을 div, txt넣어주고 item div에 추가
    let lecName = document.createElement("div");
    lecName.setAttribute("class", "item subject");

    let lecNameTxt = document.createTextNode(itemName);
    lecName.appendChild(lecNameTxt);
    lecItem.appendChild(lecName);

    //교수명 담을 div, txt넣어주고 item div에 추가
    let lecProf = document.createElement("div");
    lecProf.setAttribute("class", "item prof");

    let lecProfTxt = document.createTextNode(itemProf);
    lecProf.appendChild(lecProfTxt);
    lecItem.appendChild(lecProf);

    //시간 담을 div, txt넣어주고 item div에 추가
    let lecInfo = document.createElement("div");
    lecInfo.setAttribute("class", "item time");

    let lecInfoTxt = document.createTextNode(itemInfo);
    lecInfo.appendChild(lecInfoTxt);
    lecItem.appendChild(lecInfo);

    //강의 디테일 정보 감쌀 div생성
    let lecDetails = document.createElement("div");
    lecDetails.setAttribute("class", "lecture_details");

    //학년 div txt넣고 detailsdiv추가
    let lecGrd = document.createElement("div");
    lecGrd.setAttribute("class", "details");

    let lecGrdTxt = document.createTextNode(itemGrd + "학년");
    lecGrd.appendChild(lecGrdTxt);
    lecDetails.appendChild(lecGrd);

    //이수 div txt넣고 detailsdiv추가
    let lecEss = document.createElement("div");
    lecEss.setAttribute("class", "details");

    let lecEssTxt = document.createTextNode(itemEss);
    lecEss.appendChild(lecEssTxt);
    lecDetails.appendChild(lecEss);

    //학점 div txt넣고 detailsdiv추가
    let lecHjum = document.createElement("div");
    lecHjum.setAttribute("class", "details");

    let lecHjumTxt = document.createTextNode(itemHjum + "학점");
    lecHjum.appendChild(lecHjumTxt);
    lecDetails.appendChild(lecHjum);

    //수강번호 div txt넣고 detailsdiv추가
    let lecNum = document.createElement("div");
    lecNum.setAttribute("class", "details");

    let lecNumTxt = document.createTextNode(itemNum);
    lecNum.appendChild(lecNumTxt);
    lecDetails.appendChild(lecNum);

    lecItem.appendChild(lecDetails);

    $lectureList.appendChild(lecItem);

    //팝업버튼 만들고 추가
    let popBtnBox = document.createElement("div");
    popBtnBox.setAttribute("class", "button_box");

    let popBtn = document.createElement("button");
    let popBtnTxt = document.createTextNode("추가");
    popBtn.appendChild(popBtnTxt);
    popBtn.setAttribute("class", "pop_button");
    popBtn.setAttribute("id", itemInfo);
    popBtn.setAttribute("value", itemName);
    popBtnBox.appendChild(popBtn);
    lecItem.appendChild(popBtnBox);

    lecItem.addEventListener("mouseover", (e) => {
      showBtn(popBtn, 1);
    });
    popBtn.addEventListener("click", (e) => {
      console.log("isclicked");
      drawTable(e.target.id, e.target.value);
      console.log(e.target.value);
    });
    lecItem.addEventListener("mouseleave", (e) => {
      showBtn(popBtn, 0);
    });
  };

  let isclicked = false;

  const showBtn = (btn, on) => {
    if (on === 1) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };

  return (
    <div id="main">
      <div className="main info" id="user_info">
        <div className="info_box">
          <div className="info user_img">
            <div className="user_img"></div>
          </div>
          <div className="info user_info">
            <div className="user name" id="userName">
              김나연
            </div>
            <div className="user major" id="userMajor">
              컴퓨터공학전공
            </div>
            <div className="user grade" id="userGrd">
              4학년
            </div>
            <div className="user stdNum" id="userNum">
              2019108250
            </div>
          </div>
        </div>
      </div>

      <div className="main lecture" id="lecture_list">
        <div className="search">
          <div className="search_lecture">
            <input
              type="text"
              id="search_bar"
              className="search_bar"
              name="search_bar"
              placeholder="강의명을 입력하세요"
            ></input>
            <button className="btn search_btn">
              <img
                src="https://github.com/boongwa-webA/pickle/blob/data/img/search_btn_img.png?raw=true"
                alt="search icon"
              ></img>
            </button>
          </div>
          <div className="search_category">
            <button
              className="btn category"
              id="category_1"
              onClick={() => cateegoryClick("category_1")}
            >
              전공필수
            </button>
            <button
              className="btn category"
              id="category_2"
              onClick={() => cateegoryClick("category_2")}
            >
              기초교양
            </button>
            <button
              className="btn category"
              id="category_3"
              onClick={() => cateegoryClick("category_3")}
            >
              전공과목
            </button>
          </div>
        </div>
        <div className="lecture_list"></div>
      </div>
      <div className="main timetable" id="user_timetable">
        <div className="timetablename">
          <p>시간표</p>
        </div>
        <div className="edit_button">
          <button className="btn edit" onClick={() => saveTable()}>
            저장
          </button>
          <button className="btn edit">+</button>
        </div>
        <div className="timetable">
          <div className="header">
            <div className="day"> </div>
            <div className="day">월</div>
            <div className="day">화</div>
            <div className="day">수</div>
            <div className="day">목</div>
            <div className="day">금</div>
          </div>
          <div className="tableWrapper" id="tableWrapper"></div>
        </div>
      </div>
    </div>
  );
};

export default Main;
