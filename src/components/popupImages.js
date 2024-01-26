import React, { useEffect, useState } from "react";
import "./popupImages.css";
import ClickImage from "./clickImage";
import AllUsersin from "./allUsersin";

function PopupImages({ offre, s, set}) {
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
  return (
    <div className="popup-images" style={s}>
      {imageStyle.src && (
        <ClickImage source={imageStyle} set={{ set: setImagestyle }} />
      )}
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
        <div className="popup-footer"></div>
        <div className="images">
          {offre.images.map((elm) => (
            <div>
            <img
              src={`data:image/jpeg;base64,${elm.data}`}
              alt=""
              key={elm.id}
              onClick={handelOnImageClick}
            />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopupImages;
