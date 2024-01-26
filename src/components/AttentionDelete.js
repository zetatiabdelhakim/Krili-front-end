import React from "react";
import "./AttentionDelete.css";
import axios from "axios";
import {
  deleteUserFromLocalStorage,
  addUserToLocalStorage,
  updateUserInLocalStorage,
  readUserFromLocalStorage,
} from "../functions/user";
function AttentionDelete({ user, setUser, setStyle, offre }) {
  async function onValidClick() {
    await axios.delete(`http://localhost:8080/deleteOffre/${offre.id}`);
    await axios
      .post("http://localhost:8080/login", {
        login: user.login,
        password: user.password,
      })
      .then((response) => {
        updateUserInLocalStorage(response.data);
        setUser(response.data);
      });

    setStyle.set({ transform: "scaleY(0)" });
  }

  return (
    <div className="AttentionDelete">
      <p>
        Attention, cette action entraînera une suppression définitive de cette
        offre.
      </p>
      <button onClick={onValidClick}>Valide</button>
    </div>
  );
}

export default AttentionDelete;
