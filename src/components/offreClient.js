import React, { useEffect, useState } from "react";
import "./offreClient.css";
import PopupImages from "./popupImages";
import axios from "axios";
import AllUsersin from "./allUsersin";
import ClickImage from "./clickImage";
import {
  deleteUserFromLocalStorage,
  addUserToLocalStorage,
  updateUserInLocalStorage,
  readUserFromLocalStorage,
} from "../functions/user";
import { useNavigate } from "react-router-dom";

function OffreClient({ theOffre }) {
  let navigate = useNavigate();
  let [user, setUser] = useState(readUserFromLocalStorage());
  let [likeHand, setLikeHand] = useState({ like: false, hand: false });
  let [offre, setOffre] = useState(theOffre);
  let [popStyle, setPopStyle] = useState({ transform: "scaleY(0)" });
  let [handUsers, setHandUsers] = useState([]);
  let [usersStyle, setUsersStyle] = useState({ transform: "scale(0)" });
  let [imageStyle, setImagestyle] = useState({
    src: "",
    transform: "scaleY(0)",
  });

  const fetchOffres = async () => {
    const { data } = await axios.get(
      `http://localhost:8080/usersWithHand/${offre.id}`
    );
    setHandUsers(data);
  };

  useEffect(() => {
    fetchOffres();
    isLikeHand();
  }, []);
  useEffect(() => {
    isLikeHand();
    updateUserInLocalStorage(user);
  }, [user]);
  function isLikeHand() {
    if (user) {
      let likes = user.likes && user.likes.map((elm) => elm.id);
      let hands = user.hands && user.hands.map((elm) => elm.id);
      setLikeHand({
        like: likes&&likes.includes(offre.id),
        hand: hands&&hands.includes(offre.id),
      });
    }
  }

  function handleOnPlusImagesClick(e) {
    setPopStyle({ transform: "scaleY(1)" });
  }

  function handelOnImageClick(e) {
    setImagestyle({ src: e.target.src, transform: "scaleY(1)" });
  }

  function handelOnPlusUsersClick(e) {
    let top = e.target.offsetTop + 20;
    let left = e.target.offsetLeft - 20;
    setUsersStyle({ transform: "scale(1)", bottom: top, right: left });
  }
  async function onLike() {
    if (user) {
      if (likeHand.like) {
        let responce = await axios.put(
          `http://localhost:8080/removeLike/${user.id}/${offre.id}`
        );
        setUser(responce.data);
        return;
      }
      let responce = await axios.put(
        `http://localhost:8080/addLike/${user.id}/${offre.id}`
      );
      setUser(responce.data);
    } else {
      navigate("/login");
    }
  }
  async function onHand() {
    if (user) {
      if (likeHand.hand) {
        let responce = await axios.put(
          `http://localhost:8080/removeHand/${user.id}/${offre.id}`
        );
        setUser(responce.data);
        return;
      }
      let responce = await axios.put(
        `http://localhost:8080/addHand/${user.id}/${offre.id}`
      );
      setUser(responce.data);
    } else {
      navigate("/login");
    }
  }
  return (
    <div className="offreClient">
      <ClickImage source={imageStyle} set={{ set: setImagestyle }} />
      <AllUsersin
        users={handUsers}
        s={usersStyle}
        set={{ set: setUsersStyle }}
      />
      <PopupImages offre={offre} s={popStyle} set={{ set: setPopStyle }} />

      <div className="top">
        <div className="images">
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
      <i
        className="fa-solid fa-heart fa-xl like"
        onClick={onLike}
        style={{
          opacity: likeHand.like ? 1 : 0.5,
          color: likeHand.like ? "red" : "black",
        }}
      ></i>
      <div className="im-in">
        <i
          className="fa-solid fa-hand fa-xl"
          onClick={onHand}
          style={{
            opacity: likeHand.hand ? 1 : 0.5,
            color: likeHand.hand ? "green" : "black",
          }}
        ></i>
        <div className="other-people" onClick={handelOnPlusUsersClick}>
          <i className="fa-solid fa-circle fa-xl"></i>
          <p className="number">{handUsers.length}</p>
        </div>
      </div>
    </div>
  );
}

export default OffreClient;
