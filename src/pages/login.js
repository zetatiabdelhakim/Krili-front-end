import React, { useEffect, useState } from "react";
import "./login.css";
import logo from "../images/logo.svg";
import axios from "axios";
import {
  deleteUserFromLocalStorage,
  addUserToLocalStorage,
  updateUserInLocalStorage,
  readUserFromLocalStorage,
} from "../functions/user";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [values, setValues] = useState({});
  const [error, setError] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    if (readUserFromLocalStorage()) {
      let user = readUserFromLocalStorage();
      if (user.isAdmin) {
        // navigate("/addOffre");
      } else {
        navigate("/home");
      }
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/login", values)
      .then((response) => {
        console.log(response.data);
        addUserToLocalStorage(response.data);
        if (response.data.isAdmin) {
          // navigate("/admin");
        } else {
          navigate("/home");
        }
      })
      .catch((error) => {
        setError(error.response.data.errorMessage);
        console.log(error.response.data.errorMessage);
      });
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="login-page">
        <Link to="/">
          <img src={logo} alt="" className="log" />
        </Link>
        <h1 className="title">Connexion</h1>
        {error && (
          <div className="eroor">
            <i className="fa-solid fa-circle-exclamation">
              &nbsp;&nbsp; {error}
            </i>
            <br />
            <br />
          </div>
        )}
        <div className="inputs">
          <div className="input-label">
            <label htmlFor="" className="Login">
              Login :
            </label>
            <label htmlFor="" className="pwd">
              Mot de passe :
            </label>
          </div>
          <div className="input-place">
            <input
              type="text"
              id="login"
              name="login"
              required
              onInput={handleChange}
            />
            <input
              type="password"
              id="mdp"
              name="password"
              required
              onInput={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="valid">
          Valider
        </button>
        <div className="remember-f">
          <p className="r">
            <input type="checkbox" name="remember" id="" />
            Se souvenir de moi
          </p>
          <p className="f">Mot de passe oublié ?</p>
        </div>
        <div className="login">
          Je n'ai pas de compte,
          <Link to="/signUp">
            <a>s’incrire ?</a>
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Login;
