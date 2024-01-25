import React, { useEffect, useState } from "react";
import "./OffreLoc.css";
import axios from "axios";
import PopupImages from "./popupImages";
import ClickImage from "./clickImage";
import {
  deleteUserFromLocalStorage,
  addUserToLocalStorage,
  updateUserInLocalStorage,
  readUserFromLocalStorage,
} from "../functions/user";
import { useNavigate } from "react-router-dom";
import PopupHolder from "./popupHolder";
import AttentionDelete from "./AttentionDelete";
import EditOffre from "./EditOffre";

function OffreLoc({ theOffre, user, setUser }) {
  let [offre, setOffre] = useState(theOffre);
  let [popStyle, setPopStyle] = useState({ transform: "scaleY(0)" });
  let [likeHand, setLikeHand] = useState({ like: 0, hand: 0 });
  let [popDelete, setPopDelete] = useState({ transform: "scaleY(0)" });
  let [popEdit, setPopEdit] = useState({ transform: "scaleY(0)" });
  let [imageStyle, setImagestyle] = useState({
    src: "",
    transform: "scaleY(0)",
  });

  useEffect(() => {
    fetchLikeHand();
  }, []);
  function handleOnPlusImagesClick(e) {
    setPopStyle({ transform: "scaleY(1)" });
  }
  function handleOnDelete() {
    setPopDelete({ transform: "scaleY(1)" });
  }
  function handleOnEdit() {
    setPopEdit({ transform: "scaleY(1)" });
  }
  function handelOnImageClick(e) {
    setImagestyle({ src: e.target.src, transform: "scaleY(1)" });
  }

  async function fetchLikeHand() {
    let hand = await axios.get(`http://localhost:8080/handsNumber/${offre.id}`);
    let like = await axios.get(`http://localhost:8080/likesNumber/${offre.id}`);
    setLikeHand({ like: like.data, hand: hand.data });
  }

  return (
    <div class="offreLoc">
      <ClickImage source={imageStyle} set={{ set: setImagestyle }} />
      <PopupHolder
        Component={AttentionDelete}
        user={user}
        setUser={setUser}
        s={popDelete}
        set={{ set: setPopDelete }}
        offre={offre}
      />
      <PopupHolder
        Component={EditOffre}
        user={user}
        setUser={setUser}
        s={popEdit}
        set={{ set: setPopEdit }}
        offre={offre}
      />
      <PopupImages offre={offre} s={popStyle} set={{ set: setPopStyle }} />
      <div class="top">
        <div class="images">
          <div className="main-image">
            <img
              src={`data:image/jpeg;base64,${offre.images[0].data}`}
              alt=""
              onClick={handelOnImageClick}
            />
          </div>
          <div className="sub-images">
            {offre.images
              .filter((elm, i) => i > 0 && i < 3)
              .map((elm) => (
                <img
                  className="sub-image"
                  src={`data:image/jpeg;base64,${elm.data}`}
                  alt=""
                  key={elm.id}
                  onClick={handelOnImageClick}
                />
              ))}
            {offre.images.length > 3 ? (
              <div className="other-images" onClick={handleOnPlusImagesClick}>
                <img
                  className="first"
                  src={`data:image/jpeg;base64,${offre.images[3].data}`}
                  alt=""
                />
                <p className="number"> +{offre.images.length - 3} </p>
              </div>
            ) : (
              <font></font>
            )}
          </div>
        </div>
        <div className="info-place">
          <p className="univ">{offre.universite}</p>
          <div className="info">
            <p className="title">
              <i className="fa-solid fa-tag"></i>Prix :
            </p>
            <p className="value">{offre.prix}DH</p>
          </div>
        </div>
      </div>
      <div className="description">
        <div className="info">
          <p className="title">
            <i className="fa-solid fa-house"></i>Type de Logement :
          </p>
          <p className="value">{offre.logement}</p>
        </div>
        <div className="info">
          <p className="title">
            <i className="fa-solid fa-person-half-dress"></i>Genre Souhaité :
          </p>
          <p className="value">{offre.genre}</p>
        </div>
        <div className="info Localisation">
          <p className="title">
            <i className="fa-solid fa-location-dot"></i>Localisation :{" "}
          </p>
          <p className="value">{offre.localisation}</p>
        </div>
        <div className="info">
          <p className="title">
            <i className="fa-solid fa-phone"></i>Contact :{" "}
          </p>
          <p className="value">{offre.contact}</p>
        </div>
      </div>
      <i className="fa-solid fa-heart fa-xl like">{likeHand.like}</i>
      <i className="fa-solid fa-hand fa-xl like">{likeHand.hand}</i>
      <div className="im-in">
        <i
          className="fa-solid fa-pen-to-square fa-xl"
          onClick={handleOnEdit}
        ></i>
        <div className="other-people">
          <i className="fa-solid fa-trash fa-xl" onClick={handleOnDelete}></i>
        </div>
      </div>
    </div>
  );
}

export default OffreLoc;
