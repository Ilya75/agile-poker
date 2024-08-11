/*
    Copyright 2024 Ilya Ovchelupov
*/
import React from "react";
import { Link } from "react-router-dom"; 

import "./LogoutPage.css";

const LogoutPage = () => {
    return(
    <div className="main">
        <div>
            <h3>You have been successfully logged out </h3>
            <Link to="/">Return back</Link>
        </div>
    </div>);
}

export default LogoutPage;