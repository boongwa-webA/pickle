import React from "react";
import { fireStore } from "./Firebase";
import { useEffect } from "react";
import { collection, Firestore, getDocs } from "firebase/firestore";
import { doc, query, where } from "firebase/firestore";
import "./mypage.css";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Mypage = () => {
    return (
        <div id="wrapper">
            <div class="mypateWrap">
    <div class = "emty"></div>
    <div class="box1">
        <p class="logo">PICKLES</p>
        <div id="profile_photo2">
            <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" class="profile" />
        </div>
        <p class="Name_1">사용자 이름</p>
        <div>  
            <p class = "profileBar">프로필</p>
            <p class = "time">시간표 목록</p>
        </div>
    </div>
    <div class="box2">
        <div class="box2_1">
            <div id="profile">
                <p>회원 정보 수정</p>
            </div>
            <div class="page_1">
                <div id="profile_photo1">
                    <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" class="profile" />
                </div>
                <div class="b">
                    <p class="Name_2">김나연</p>
                    <p id='id'>PICKLES</p>
                </div>
            </div>
            <div>
                <hr></hr>
            </div>
            <div class = "userInfoBox">
                <p>사용자 이름</p>
                <p>학교</p>
                <p>단과대학</p>
                <p>학과</p>
                <p>학년</p>
                <p>학번</p>
            </div>
            <div>
            <button id = "updateBtn">수정</button>
            </div>
        </div>
    </div>
</div>
        </div>      
    );
}

export default Mypage;