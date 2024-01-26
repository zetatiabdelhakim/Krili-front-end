import React from "react";
import "./AttentionDelete.css";
import axios from "axios";
import {
  deleteUserFromLocalStorage,
  addUserToLocalStorage,
  updateUserInLocalStorage,
  readUserFromLocalStorage,
} from "../functions/user";
function AttentionAjouterUniv({ user, setUser, setStyle, offre }) {
  async function onValidClick() {
    await axios.post(`http://localhost:8080/addUniversite`, {
      name: offre,
    });
    setStyle.set({ transform: "scaleY(0)" });
  }

  return (
    <div className="AttentionDelete">
      <p>
        Pourriez-vous confirmer la décision d'ajouter l'université <b>{offre}</b> {" "}
        avec certitude?
      </p>
      <button onClick={onValidClick}>Valide</button>
    </div>
  );
}

export default AttentionAjouterUniv;
