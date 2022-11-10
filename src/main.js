import React, { useCallback, useId, useRef, useState } from "react";
import { fireStore } from "./Firebase";
import { useEffect } from "react";
import { collection, Firestore, getDocs } from "firebase/firestore";
import { doc, query, where } from "firebase/firestore";
import styled, { css } from "styled-components";
import "./main.css";
import { async } from "@firebase/util";
import userEvent from "@testing-library/user-event";

function Modal(){
    return(
        <div className="modal">
            <h3>{}</h3>
            <p>{}</p>
        </div>
    )
}
//
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
    const genLectureQuery = query(
        collection(fireStore, "lecture"),
        where("essential", "==", "기초역량교양"),
        where("dep", "==", "제주대학교 교양")
    )
  //전공과목 탐색 쿼리


  useEffect(() => {
    const getLectureList = async () => {
      const data = await getDocs(lectureQuery);
      data.forEach((doc) => {
        showLectureItem(doc.data());
        console.log(doc.data());
      });
    };
    getLectureList();
  }, []);

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
              onClick={() => categoryClick("category_1")}
            >
              전공필수
            </button>
            <button
              className="btn category"
              id="category_2"
              onClick={() => categoryClick("category_2")}
            >
              기초교양
            </button>
            <button
              className="btn category"
              id="category_3"
              onClick={() => categoryClick("category_3")}
            >
              전공과목
            </button>
          </div>
        </div>
        <div className="lecture_list">
          {

          }
        </div>
      </div>
      <div className="main timetable" id="user_timetable">
        <div className="timetablename"></div>
        <div className="edit_button">
          <button className="btn edit">저장</button>
          <button className="btn edit">+</button>
        </div>
        <div className="timetable">
        <table
            width="100%"
            height="200"
            cellSpacing="3"
            >
            <tbody>
                <tr className="trHeight" align="center" bgcolor="white">
                    <th></th>
                    <th>월</th>
                    <th>화</th>
                    <th>수</th>
                    <th>목</th>
                    <th>금</th>
                    <th>토</th>
                    <th>일</th>
                </tr>
                <tr align="center" bgcolor="white">
                    <th>9</th>
                    <td className="Mon1"><Modal></Modal></td>
                    <td className="Tue1"><Modal></Modal></td>
                    <td className="Wed1"><Modal></Modal></td>
                    <td className="Thu1"><Modal></Modal></td>
                    <td className="Fri1"><Modal></Modal></td>
                    <td className="Sat1"><Modal></Modal></td>
                    <td className="Sun1"><Modal></Modal></td>
                </tr>
                <tr align="center" bgcolor="white">
                    <th>10</th>
                    <td className="Mon2"><Modal></Modal></td>
                    <td className="Tue2"><Modal></Modal></td>
                    <td className="Wed2"><Modal></Modal></td>
                    <td className="Thu2"><Modal></Modal></td>
                    <td className="Fri2"><Modal></Modal></td>
                    <td className="Sat2"><Modal></Modal></td>
                    <td className="Sun2"><Modal></Modal></td>
                </tr>
                <tr align="center" bgcolor="white">
                    <th>11</th>
                    <td className="Mon3"><Modal></Modal></td>
                    <td className="Tue3"><Modal></Modal></td>
                    <td className="Wed3"><Modal></Modal></td>
                    <td className="Thu3"><Modal></Modal></td>
                    <td className="Fri3"><Modal></Modal></td>
                    <td className="Sat3"><Modal></Modal></td>
                    <td className="Sun3"><Modal></Modal></td>
                </tr>
                <tr align="center" bgcolor="white">
                    <th>12</th>
                    <td className="Mon4"><Modal></Modal></td>
                    <td className="Tue4"><Modal></Modal></td>
                    <td className="Wed4"><Modal></Modal></td>
                    <td className="Thu4"><Modal></Modal></td>
                    <td className="Fri4"><Modal></Modal></td>
                    <td className="Sat4"><Modal></Modal></td>
                    <td className="Sun4"><Modal></Modal></td>
                </tr>
                <tr align="center" bgcolor="white">
                    <th>13</th>
                    <td className="Mon5"><Modal></Modal></td>
                    <td className="Tue5"><Modal></Modal></td>
                    <td className="Wed5"><Modal></Modal></td>
                    <td className="Thu5"><Modal></Modal></td>
                    <td className="Fri5"><Modal></Modal></td>
                    <td className="Sat5"><Modal></Modal></td>
                    <td className="Sun5"><Modal></Modal></td>
                </tr>
                <tr align="center" bgcolor="white">
                    <th>14</th>
                    <td className="Mon6"><Modal></Modal></td>
                    <td className="Tue6"><Modal></Modal></td>
                    <td className="Wed6"><Modal></Modal></td>
                    <td className="Thu6"><Modal></Modal></td>
                    <td className="Fri6"><Modal></Modal></td>
                    <td className="Sat6"><Modal></Modal></td>
                    <td className="Sun6"><Modal></Modal></td>
                </tr>
                <tr align="center" bgcolor="white">
                    <th>15</th>
                    <td className="Mon7"><Modal></Modal></td>
                    <td className="Tue7"><Modal></Modal></td>
                    <td className="Wed7"><Modal></Modal></td>
                    <td className="Thu7"><Modal></Modal></td>
                    <td className="Fri7"><Modal></Modal></td>
                    <td className="Sat7"><Modal></Modal></td>
                    <td className="Sun7"><Modal></Modal></td>
                </tr>
                <tr align="center" bgcolor="white">
                    <th>16</th>
                    <td className="Mon8"><Modal></Modal></td>
                    <td className="Tue8"><Modal></Modal></td>
                    <td className="Wed8"><Modal></Modal></td>
                    <td className="Thu8"><Modal></Modal></td>
                    <td className="Fri8"><Modal></Modal></td>
                    <td className="Sat8"><Modal></Modal></td>
                    <td className="Sun8"><Modal></Modal></td>
                </tr>
                <tr align="center" bgcolor="white">
                    <th>17</th>
                    <td className="Mon9"><Modal></Modal></td>
                    <td className="Tue9"><Modal></Modal></td>
                    <td className="Wed9"><Modal></Modal></td>
                    <td className="Thu9"><Modal></Modal></td>
                    <td className="Fri9"><Modal></Modal></td>
                    <td className="Sat9"><Modal></Modal></td>
                    <td className="Sun9"><Modal></Modal></td>
                </tr>
            </tbody>
        </table>

        </div>
      </div>
    </div>
  );
};

export default Main;
