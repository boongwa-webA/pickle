import React, { useCallback, useId, useRef, useState } from "react";
import { fireStore } from "./Firebase";
import { useEffect } from "react";
import { collection, Firestore, getDocs } from "firebase/firestore";
import { doc, query, where } from "firebase/firestore";
import styled, { css } from "styled-components";
import "./main.css";
import { async } from "@firebase/util";
import userEvent from "@testing-library/user-event";
import { getAuth } from "firebase/auth";

const Main = () => {
  const lectureQuery = query(
    collection(fireStore, "lecture"),
    where("prof", "==", "김수균")
  );

  //전공필수(lecture테이블)이면서 lecture학과가 사용자 학과랑 같아야함.
  const essLectureQuery = query(
    collection(fireStore, "lecture"),
    where("essential", "==", "전공필수"),
    where("dep", "==", "공과대학 소프트웨어학부 컴퓨터공학전공")
  );

  //기초교양 과목 쿼리
  //전공과목 탐색 쿼리

  useEffect(() => {
    const auth = getAuth();
    console.log(auth);
    const getLectureList = async () => {
      const data = await getDocs(lectureQuery);
      data.forEach((doc) => {
        showLectureItem(doc.data());
        console.log(doc.data());
      });
    };
    getLectureList();
  }, []);

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
    popBtnBox.appendChild(popBtn);
    lecItem.appendChild(popBtnBox);

    lecItem.addEventListener("mouseover", (e) => {
      showBtn(popBtn, 1);
      popBtn.addEventListener("mousedown", console.log("isclicked"));
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
        <div className="lecture_list">
          {/*<div className="lecture_item">
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
          </div>*/}
        </div>
      </div>
      <div className="main timetable" id="user_timetable">
        <div className="timetablename">
          <p>시간표</p>
        </div>
        <div className="edit_button">
          <button className="btn edit">저장</button>
          <button className="btn edit">+</button>
        </div>
        <div className="timetable">
          <table width="100%" height="200" cellSpacing="3">
            <tbody>
              <tr className="trHeight" align="center" bgcolor="white">
                <th></th>
                <td>월</td>
                <td>화</td>
                <td>수</td>
                <td>목</td>
                <td>금</td>
                <td>토</td>
                <td>일</td>
              </tr>
              <tr align="center" bgcolor="white">
                <th>9</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr align="center" bgcolor="white">
                <th>10</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr align="center" bgcolor="white">
                <th>11</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr align="center" bgcolor="white">
                <th>12</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr align="center" bgcolor="white">
                <th>13</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr align="center" bgcolor="white">
                <th>14</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr align="center" bgcolor="white">
                <th>15</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr align="center" bgcolor="white">
                <th>16</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr align="center" bgcolor="white">
                <th>17</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Main;
