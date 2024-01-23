import React, { useEffect, useState } from "react";
import "./popupImages.css";
import ClickImage from "./clickImage";
import AllUsersin from "./allUsersin";

function PopupImages({ offre, s, set, handUsers }) {

  let [imageStyle, setImagestyle] = useState({
    src: null,
    transform: "scaleY(0)",
  });

  function handelOnImageClick(e) {
    setImagestyle({ src: e.target.src, transform: "scaleY(1)" });
  }

  function handleOnXClick(e) {
    set.set({ transform: "scaleY(0)" });
  }
  let [usersStyle, setUsersStyle] = useState({ transform: "scale(0)" });
  function handelOnPlusUsersClick(e) {
    let top = e.target.offsetTop;
    let left = e.target.offsetLeft - 20;
    setUsersStyle({ transform: "scale(1)", bottom: top, right: left });
  }
  return (
    <div className="popup-images" style={s}>
        {imageStyle.src && <ClickImage source={imageStyle} set={{ set: setImagestyle }} />}
      <div className="main">
        <div className="X" onClick={handleOnXClick}>
          <i className="fa-solid fa-xmark fa-2xl"></i>
        </div>
        <div className="popup-header">
          <div className="info">
            <p className="title">
              <i className="fa-solid fa-phone"></i>Contact :{" "}
            </p>
            <p className="value">{offre.contact}</p>
          </div>
          <div className="info Localisation">
            <p className="title">
              <i className="fa-solid fa-location-dot"></i>
            </p>
            <p className="value">{offre.localisation}</p>
          </div>
        </div>
        <div className="popup-footer">
        <AllUsersin users={handUsers.handUser} s={usersStyle} set={{set : setUsersStyle}} />
          <i id="h" className="fa-solid fa-heart fa-xl like"></i>
          <div className="im-in">
            <i className="fa-solid fa-hand fa-xl"></i>
            <div className="other-people" onClick={handelOnPlusUsersClick}>
              <i className="fa-solid fa-circle fa-xl"></i>
              <p className="number">{handUsers.handUser.length}</p>
            </div>
          </div>
        </div>
        <div className="images">
          {offre.images.map((elm, i) => (
            <img src={elm.data} alt="" key={i} onClick={handelOnImageClick} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopupImages;
