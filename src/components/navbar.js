import React from "react";
import logo from "../images/logo.svg";
import name from "../images/name.svg";
import "./navbar.css";
import { useNavigate, Link } from "react-router-dom";
import {
  deleteUserFromLocalStorage,
  addUserToLocalStorage,
  updateUserInLocalStorage,
  readUserFromLocalStorage,
} from "../functions/user";

function Navbar({ where }) {
  let user = readUserFromLocalStorage();
  let navigate = useNavigate();
  function handelLogOut() {
    deleteUserFromLocalStorage();
    navigate("/");
  }
  return (
    <div className="navbar">
      <div className="nav">
        <div className="logos">
          <Link to="/">
            <img src={logo} alt="" className="logo" />
          </Link>
          <Link to="/">
            <img src={name} alt="" className="name" />
          </Link>
        </div>
      </div>
      <div className="profile">
        <div>
          <button className="util">
            {user && user.name.charAt(0).toUpperCase()}
          </button>
        </div>
        <div className="navigation">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div
              className="acceuil"
              style={{ color: where == 1 ? "#9EA8C8" : "black" }}
            >
              <i className="fa-solid fa-house"></i>
              <span>Acceuil</span>
            </div>
          </Link>
          <Link to="/favoris" style={{ textDecoration: "none" }}>
            <div
              className="favori"
              style={{ color: where == 2 ? "#9EA8C8" : "black" }}
            >
              <i className="fa-solid fa-house-circle-check"></i>
              <span>Favoris</span>
            </div>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div
              className="offre"
              style={{ color: where == 3 ? "#9EA8C8" : "black" }}
            >
              <i className="fa-solid fa-chart-simple"></i>
              <span>Offres</span>
            </div>
          </Link>
          <div className="quit" onClick={handelLogOut}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Quitter</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
