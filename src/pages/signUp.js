import React, { useEffect, useState } from "react";
import "./signUp.css";
import logo from "../images/logo.svg";
import axios from "axios";
import {
  deleteUserFromLocalStorage,
  addUserToLocalStorage,
  updateUserInLocalStorage,
  readUserFromLocalStorage,
} from "../functions/user";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [values, setValues] = useState({});
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    if (readUserFromLocalStorage()) {
      let user = readUserFromLocalStorage();
      if (user.admin) {
        navigate("/admin");
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
      .post("http://localhost:8080/signUp", values)
      .then((response) => {
        console.log(response.data);
        addUserToLocalStorage(response.data);
        if (response.data.admin) {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      })
      .catch((error) => {
        setError(error.response.data.errorMessage);
        console.log(error.response.data.errorMessage);
      });
  };

  function handleOnCkeck(e) {
    let submitButton = document.getElementsByClassName("valid")[0];
    if (e.target.checked) {
      submitButton.classList.add("enabled");
      submitButton.removeAttribute("disabled");
    } else {
      submitButton.classList.remove("enabled");
      submitButton.setAttribute("disabled", "disabled");
    }
  }
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="signUp">
        <Link to="/">
        <img src={logo} alt="" className="log" /></Link>
        <h1 className="title">Inscription</h1>
        {error && (
          <div className="eroor">
            <i className="fa-solid fa-circle-exclamation">
              &nbsp;&nbsp; {error}
            </i>
          </div>
        )}
        <div className="inputs">
          <div className="input-label">
            <label htmlFor="" className="Nom">
              Nom Complet :
            </label>
            <label htmlFor="" className="Telephone">
              Telephone :
            </label>
            <label htmlFor="" className="Email">
              Email :
            </label>
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
              id="nom"
              name="name"
              required
              onInput={handleChange}
            />
            <input
              type="tel"
              id="telephone"
              name="phone"
              required
              onInput={handleChange}
            />
            <input
              type="email"
              id="mail"
              name="email"
              required
              onInput={handleChange}
            />
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
        <div className="warning">
          Veuillez noter que votre numéro de téléphone ainsi que votre nom
          seront partagés avec d'autres utilisateurs dans le but de favoriser la
          communication et la collaboration. Veuillez noter que nous déclinons
          toute responsabilité en cas de mauvaise utilisation de vos coordonnées
          fournies.
        </div>
        <div className="confirm">
          <input
            onClick={handleOnCkeck}
            className="valid-check"
            type="checkbox"
            name="valid"
            id="valid"
          />
          En cochant cette case, je confirme avoir lu et accepté les conditions
          d'utilisation
        </div>
        <button type="submit" className="valid" disabled>
          Valider
        </button>
        <div className="login">
          J'ai déjà un compte,{" "}
          <Link to="/login">
            <a>se connecter ?</a>
          </Link>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
