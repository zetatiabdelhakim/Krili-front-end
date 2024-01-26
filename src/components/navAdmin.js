import React from "react";
import "./navAdmin.css";
import logo from "../images/logo.svg";
import name from "../images/name.svg";
import { useNavigate, Link } from "react-router-dom";
import {
  deleteUserFromLocalStorage,
  addUserToLocalStorage,
  updateUserInLocalStorage,
  readUserFromLocalStorage,
} from "../functions/user";

function NavAdmin() {
  let user = readUserFromLocalStorage();
  let navigate = useNavigate();
  function handelLogOut() {
    deleteUserFromLocalStorage();
    navigate("/");
  }
  return (
    <div>
    <div className="navAdmin">
      <div className="nav">
        <div className="logos">
          <Link to="/admin">
            <img src={logo} alt="" className="logo" />
          </Link>
          <Link to="/admin">
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
          <div className="quit" onClick={handelLogOut}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Quitter</span>
          </div>
        </div>
      </div>
      
    </div><div class="welcomeAdmin">
      <div class="bonjourUser">
        <p>{new Date().getHours() < 18 ? "Bonjour" : "Bonsoir"} {user&&user.name}</p>
      </div>
    </div>
    </div>
  );
}

export default NavAdmin;
