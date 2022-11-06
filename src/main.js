import React, { useId } from "react";
import {fireStore} from "./Firebase"
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { doc, query, where } from "firebase/firestore";
import { async } from "@firebase/util";

const Main = () => {
    const userCollectionRef = collection(fireStore, 'lecture');
    const $lectureList = document.querySelector('#lectureList');
    const $main = document.querySelector('#main');

    const lectureQuery = query(collection(fireStore, 'lecture'), where('dep', "==", "컴퓨터공학전공"));

    let lecName = [];

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(lectureQuery);
            data.forEach((doc) => {
                console.log(doc.data().lecName);
                //lecName.push(doc.data().lecName)
            })
            //showLecture(lecName);
        }
        getUsers();
    })
    
    //강의 목록 보여주는 함수
    const showLecture = (name) => {
        console.log('for문 시작 전')
        for(let i=0; i<=50; i++) {
            console.log('들어왔땁');
            let lecItem = document.createElement('div');
            let lecName = document.createElement('p');
            let lecNameTxt = document.createTextNode(name[i]);

            lecName.appendChild(lecNameTxt);
            lecItem.appendChild(lecName);
            $lectureList.appendChild(lecItem);
            $main.appendChild($lectureList);
        }
    }
    
    return (
        <div id="main">
            mainpage
            <div id="lectureList">
            </div>
        </div>
    )
}

export default Main