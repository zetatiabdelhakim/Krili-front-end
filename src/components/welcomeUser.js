import React from "react";
import "./welcomeUser.css";
import {
  deleteUserFromLocalStorage,
  addUserToLocalStorage,
  updateUserInLocalStorage,
  readUserFromLocalStorage,
} from "../functions/user";

function WelcomeUser() {
  let user = readUserFromLocalStorage();
  return (
    <div class="welcomeUser">
      <div class="bonjourUser">
        {new Date().getHours() < 18 ? "Bonjour" : "Bonsoir"} {user.name}
      </div>
      <div class="msgAccueil">
        Nous sommes ravis de vous revoir sur notre plateforme dédiée à
        simplifier la recherche de logement universitaire. Chez nous, votre
        confort et vos besoins sont notre priorité absolue.
      </div>
    </div>
  );
}

export default WelcomeUser;
