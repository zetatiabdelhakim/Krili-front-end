import React from "react";
import logo from "../images/logo.svg";
import name from "../images/name.svg";
import "./NavIndex.css";
import { Link } from "react-router-dom";
function NavIndex() {
  return (
    <div className="header">
      <img src={logo} alt="" className="logo" />
      <img src={name} alt="" className="name" />
      <Link to="/login">
        <button className="connect">se connecter</button>
      </Link>
    </div>
  );
}

export default NavIndex;
