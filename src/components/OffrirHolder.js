import React, { useState } from "react";
import {
  deleteUserFromLocalStorage,
  addUserToLocalStorage,
  updateUserInLocalStorage,
  readUserFromLocalStorage,
} from "../functions/user";
import "./OffrirHolder.css";
import OffreLoc from "./OffreLoc";
import { Link } from "react-router-dom";
function OffrirHolder() {
  const [user, setUser] = useState(readUserFromLocalStorage());
  let [popStyle, setPopStyle] = useState({ transform: "scaleY(0)" });
  function handleOnRemoveHnadsClick() {
    setPopStyle({ transform: "scaleY(1)" });
  }
  return (
    <div className="OffrirHolder">
      <div className="offreHeader">
        <div className="offreTitre">Mes Offres</div>
        <div className="offreButtons">
          {" "}
          <div className="ajouterOffre">
            <Link to="/addOffre">
              {" "}
              <i className="fa-solid fa-square-plus"></i>{" "}
            </Link>
            <span>Ajouter Offre</span>
          </div>
          <div className="notificationOffre">
            <i className="fa-solid fa-bell"></i>
          </div>
        </div>
      </div>
      <div className="offres">
        {user &&
          user.myOffres.map((elm) => (
            <OffreLoc
              user={user}
              setUser={setUser}
              theOffre={elm}
              key={elm.id}
            />
          ))}
      </div>
      {user && user.myOffres.length ? (
        <font></font>
      ) : (
        <div className="nothing">
          <Link to="/addOffre">
            <i className="fa-solid fa-square-plus"></i>
          </Link>
          <p>
            <b>Jusqu’à présent, vous n’avez proposé aucune offre.</b> Si vous
            avez une offre à soumettre, veuillez cliquer sur '+' pour l’ajouter.
            Nous sommes ravis de vous servir.
          </p>
        </div>
      )}
    </div>
  );
}

export default OffrirHolder;
