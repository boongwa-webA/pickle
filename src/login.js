import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return(
        <div id="wrapper">
            log in 화면
            <Link to="/main">
                <button>mainpage</button>
            </Link>
        </div>
    )
}

export default Login