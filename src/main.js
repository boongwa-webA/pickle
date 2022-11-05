import React, { useId } from "react";
import {fireStore} from "./Firebase"
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { doc, query, where } from "firebase/firestore";
import { async } from "@firebase/util";

const Main = () => {
    const userCollectionRef = collection(fireStore, 'lecture');
    const $lectureNames = document.querySelector('#lectureNames');

    let lecName = [];

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userCollectionRef);
            data.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                console.log(doc.data().lecName)
                lecName.push(doc.data().lecName)
            })
            console.log(lecName)
            showLecture(lecName);
        }
        getUsers();
    })
    
    const showLecture = (lecName) => {
        for(let i=0; i<=lecName.size; i++) {
            let lectureNameList = document.createElement('lectureList');
            lectureNameList.innerHTML = `<li>${lecName[i]}</li>`;
            document.body.appendChild(lectureNameList);
        }
    }
    
    return (
        <div id="main">
            mainpage
            <div id="lectureNames">
            </div>
        </div>
    )
}

export default Main