import React, { useState } from "react";
import {
  deleteUserFromLocalStorage,
  addUserToLocalStorage,
  updateUserInLocalStorage,
  readUserFromLocalStorage,
} from "../functions/user";
import "./FavorisHolder.css";
import OffreClient from "./offreClient";
import PopupHolder from "./popupHolder";
import AttentionHand from "./AttentionHand";

function FavorisHolder() {
  const [user, setUser] = useState(readUserFromLocalStorage());
  let [popStyle, setPopStyle] = useState({ transform: "scaleY(0)" });
  function handleOnRemoveHnadsClick() {
    setPopStyle({ transform: "scaleY(1)" });
  }

  return (
    <div className="FavorisHolder">
      <PopupHolder
        Component={AttentionHand}
        user={user}
        setUser={setUser}
        s={popStyle}
        set={{ set: setPopStyle }}
      />
      <div className="offreHeader">
        <div className="offreTitre">Mes Favoris</div>
        <div className="FavoriButton">
          {user && user.hands.length ? (
            <div className="BaisserMain" onClick={handleOnRemoveHnadsClick}>
              <i className="fa-regular fa-hand"></i>
              <span class="baisser">Baisser mon main</span>
            </div>
          ) : (
            <font></font>
          )}
        </div>
      </div>
      <div className="offres">
        {user &&
          user.hands.map((elm) => <OffreClient theOffre={elm} key={elm.id} />)}
        {user &&
          user.likes
            .filter((elm) => !user.hands.map((a) => a.id).includes(elm.id))
            .map((elm) => <OffreClient theOffre={elm} key={elm.id} />)}
      </div>
      {user && (user.hands.length || user.likes.length) ? (
        <font></font>
      ) : (
        <div className="nothing">
          <i className="fa-solid fa-face-smile-beam"></i>
          <p>
            <b>
              Jusqu'à présent, aucune offre ne semble avoir retenu votre
              attention.
            </b>{" "}
            Découvrez les propositions intéressantes sur la page d'accueil, nous
            sommes heureux de vous être utile !
          </p>
        </div>
      )}
    </div>
  );
}

export default FavorisHolder;
