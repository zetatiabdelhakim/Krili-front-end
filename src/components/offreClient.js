import React, { useEffect, useState } from "react";
import "./offreClient.css";
import PopupImages from "./popupImages";
import axios from "axios";
import AllUsersin from "./allUsersin";
import ClickImage from "./clickImage";

function OffreClient({ theOffre }) {
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
  }, []);

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
  return (
    <div className="offreClient">
      <ClickImage source={imageStyle} set={{ set: setImagestyle }} />
      <AllUsersin
        users={handUsers}
        s={usersStyle}
        set={{ set: setUsersStyle }}
      />
      <PopupImages
        offre={offre}
        s={popStyle}
        set={{ set: setPopStyle }}
        handUsers={{ handUser: handUsers }}
      />
      <div className="top">
        <div className="images">
          <div className="main-image">
            <img
              src={offre.images[0].data}
              alt=""
              onClick={handelOnImageClick}
            />
          </div>
          <div className="sub-images">
            {offre.images
              .filter((elm, i) => i > 0 && i < 3)
              .map((elm, i) => (
                <img
                  className="sub-image"
                  src={elm.data}
                  alt=""
                  key={i}
                  onClick={handelOnImageClick}
                />
              ))}
            {offre.images.length > 3 ? (
              <div className="other-images" onClick={handleOnPlusImagesClick}>
                <img className="first" src={offre.images[3].data} alt="" />
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
      <i className="fa-solid fa-heart fa-xl like"></i>
      <div className="im-in">
        <i className="fa-solid fa-hand fa-xl"></i>
        <div className="other-people" onClick={handelOnPlusUsersClick}>
          <i className="fa-solid fa-circle fa-xl"></i>
          <p className="number">{handUsers.length}</p>
        </div>
      </div>
    </div>
  );
}

export default OffreClient;
