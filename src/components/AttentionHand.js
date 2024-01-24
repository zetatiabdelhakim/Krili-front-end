import React, { useEffect } from "react";
import "./AttentionHand.css";
import axios from "axios";
import {
  deleteUserFromLocalStorage,
  addUserToLocalStorage,
  updateUserInLocalStorage,
  readUserFromLocalStorage,
} from "../functions/user";

function AttentionHand({ user, setUser, setStyle }) {
  async function onValidClick() {
    let responce = await axios.put(
      `http://localhost:8080/removeAllHands/${user.id}`
    );
    setUser(responce.data);
    updateUserInLocalStorage(responce.data);
    setStyle.set({ transform: "scaleY(0)" });
  }
  return (
    <div className="AttentionHand">
      <p>
        Attention, cette action supprimera votre intérêt (participation) dans
        toutes les offres.
      </p>
      <button onClick={onValidClick}>Valide</button>
    </div>
  );
}

export default AttentionHand;
