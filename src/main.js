import React, { useCallback, useId, useRef, useState } from "react";
import { fireStore } from "./Firebase";
import { useEffect } from "react";
import { collection, Firestore, getDocs } from "firebase/firestore";
import { doc, query, where } from "firebase/firestore";
import "./main.css";
import { async } from "@firebase/util";
import userEvent from "@testing-library/user-event";

const Main = () => {
  const lectureQuery = query(
    collection(fireStore, "lecture"),
    where("prof", "==", "김수균")
  );

  useEffect(() => {
    const getUsers = async () => {
      let lecNames = new Array();
      const data = await getDocs(lectureQuery);
      data.forEach((doc) => {
        lecNames.push(doc.data().lecName);
      });
      showLecture(lecNames);
    };
    getUsers();
  }, []);

  //강의 목록 보여주는 함수
  const showLecture = (name) => {
    const $lectureList = document.querySelector("#lecture_list");
    for (let i = 0; i < name.length; i++) {
      let lecItem = document.createElement("div");
      let lecName = document.createElement("p");
      let lecNameTxt = document.createTextNode(name[i]);

      lecName.appendChild(lecNameTxt);
      lecItem.appendChild(lecName);
      $lectureList.appendChild(lecItem);
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
            <div className="user name">김나연</div>
            <div className="user major">컴퓨터공학전공</div>
            <div className="user grade">4학년</div>
            <div className="user stdNum">학번</div>
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
            <button className="btn category">전공필수</button>
            <button className="btn category">기초교양</button>
            <button className="btn category">전공과목</button>
          </div>
        </div>
        <div className="lecture_list">
          <div className="lecture_item">
            <div className="item subject" id="lecture_subject">
              수강과목
            </div>
            <div className="item prof" id="lecture_prof">
              교수명
            </div>
            <div className="item time" id="lecture_time">
              시간
            </div>
            <div className="lecture_details">
              <div className="details" id="lecture_grade">
                학년
              </div>
              <div className="details" id="lecture_category">
                이수
              </div>
              <div className="details" id="lecture_hakjum">
                학점
              </div>
              <div className="details" id="lecture_num">
                수강번호
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main timetable" id="user_timetable">
        <div className="timetable">시간표</div>
        <div className="edit_button">
          <button className="btn edit">저장</button>
          <button className="btn edit">+</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
