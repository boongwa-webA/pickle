// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Register() {
    return (
        <div className="page">
            <div className="maincontent">
                <div className="title">
                    PICKLES
                </div>
                <div className="inputcontent">
                    <div className="inputWrap">
                        <label htmlFor="userName">이름 </label>
                        <input className="userName" type="text" placeholder="이름을 입력해주세요."/>
                    </div>
                    <div className="inputWrap">
                        <label htmlFor="userId">아이디</label>
                        <input className="userId" type="text" placeholder="아이디를 입력해주세요.(이메일 형식)"/>
                    </div>
                    <div className="inputWrap">
                        <label htmlFor="userPw">비밀번호</label>
                        <input className="userPw" type="text" placeholder="비밀번호를 입력해주세요."/>
                    </div>
                    <div className="inputWrap">
                        <label htmlFor="pwCheck">비밀번호 확인</label>
                        <input className="pwCheck" type="text" placeholder="비밀번호를 확인해주세요"/>
                    </div>
                    <div className="inputWrap">
                        <label htmlFor="univ">학교</label>
                        <input className="univ" type="text" placeholder="학교를 입력해주세요."/>
                    </div>
                    <div className="inputWrap">
                        <label htmlFor="grade">학년</label>
                        <input className="grade" type="text" list="grade" placeholder="학년을 입력해주세요."/>
                        <datalist id="grade">
                            <option>1학년</option>
                            <option>2학년</option>
                            <option>3학년</option>
                            <option>4학년</option>
                        </datalist>
                    </div>
                    <div className="inputWrap">
                        <label htmlFor="col">단과대학</label>
                        <input className="col" list="col" type="text" placeholder="단과대학을 입력해주세요."/>
                        <datalist id="col">
                        <option>인문대학</option>
                            <option>사회과학대학</option>
                            <option>경상대학</option>
                            <option>사범대학</option>
                            <option>생명자원과학대학</option>
                            <option>해양과학대학</option>
                            <option>자연과학대학</option>
                            <option>공과대학</option>
                            <option>의과대학</option>
                            <option>교육대학</option>
                            <option>수의과대학</option>
                            <option>간호대학</option>
                            <option>예술디자인대학</option>
                            <option>미래융합대학</option>
                            <option>약학대학</option>
                        </datalist>
                    </div>
                    <div className="inputWrap">
                        <label htmlFor="major">학과</label>
                        <input className="major" type="text" list="major" placeholder="학과를 입력해주세요."/>
                        <datalist id="major">

                        </datalist>
                    </div>
                    <div className="inputWrap">
                        <label htmlFor="stdNum">학번</label>
                        <input className="stdNum" type="text" placeholder="학번을 입력해주세요."/>
                    </div>
                    <div className="btn_group">
                        <button className="cancel">
                            <Link to="/login">취소하기</Link>
                        </button>
                        <button className="join">가입하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;