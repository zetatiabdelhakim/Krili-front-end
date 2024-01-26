import React, { useEffect, useState } from "react";
import "./offreClient.css";
import PopupImages from "./popupImages";
import axios from "axios";
import {
  deleteUserFromLocalStorage,
  addUserToLocalStorage,
  updateUserInLocalStorage,
  readUserFromLocalStorage,
} from "../functions/user";
import "./OffreAdmine.css";
import { useNavigate } from "react-router-dom";
import AttentionDelete from "./AttentionDelete";
import PopupHolder from "./popupHolder";

function OffreAdmine({ theOffre, user, setUser, setOffres }) {
  let [offre, setOffre] = useState(theOffre);
  let [popStyle, setPopStyle] = useState({ transform: "scaleY(0)" });
  let [popDelete, setPopDelete] = useState({ transform: "scaleY(0)" });

  function handleOnDelete() {
    setPopDelete({ transform: "scaleY(1)" });
    fetchOffres();
  }

  function handleOnPlusImagesClick(e) {
    setPopStyle({ transform: "scaleY(1)" });
  }
  async function handelOnVerif(e) {
    await axios.put(`http://localhost:8080/verifieOffers/${offre.id}`);
    fetchOffres();
  }
  const fetchOffres = async () => {
    const { data } = await axios.get("http://localhost:8080/offres");
    setOffres(data);
  };
  return (
    <div>
      <PopupImages offre={offre} s={popStyle} set={{ set: setPopStyle }} />
      <div className="offreAdmin">
        <PopupHolder
          Component={AttentionDelete}
          user={user}
          setUser={setUser}
          s={popDelete}
          set={{ set: setPopDelete }}
          offre={offre}
        />
        <div className="head">
          <div className="other-images" onClick={handleOnPlusImagesClick}>
            <img
              className="first"
              src={`data:image/jpeg;base64,${offre.images[0].data}`}
              alt=""
            />
            <p className="number">+{offre.images.length}</p>
          </div>
          <div className="title">
            <b>{offre.universite}</b>
          </div>
        </div>

        <div className="info">
          <div className="tele">
            <p className="title">
              <i className="fa-solid fa-phone"></i>
            </p>
            <p className="value">{offre.contact}</p>
          </div>
          <div>
            <p className="title">
              <i className="fa-solid fa-house"></i>
            </p>
            <p className="value">{offre.logement}</p>
          </div>
          <div>
            <p className="title">
              <i className="fa-solid fa-tag"></i>
            </p>
            <p className="value">{offre.prix}DH</p>
          </div>
          <div>
            <p className="title">
              <i className="fa-solid fa-person-half-dress"></i>
            </p>
            <p className="value">{offre.genre}</p>
          </div>
        </div>
        <div className="localisation">
          <p className="title">
            <i className="fa-solid fa-location-dot"></i>
          </p>
          <p className="value">{offre.localisation}</p>
        </div>
        <div className="delete" onClick={handleOnDelete}>
          <i className="fa-solid fa-trash-can"></i>
        </div>
        <div className="check">
          {offre.verified ? (
            <></>
          ) : (
            <i className="fa-solid fa-circle-check" onClick={handelOnVerif}></i>
          )}
        </div>
      </div>
    </div>
  );
}

export default OffreAdmine;
