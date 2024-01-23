import React from "react";
import "./clickImage.css"

function ClickImage({source, set}) {
    function handleOnXClick() {
        set.set({src : "", transform: "scaleY(0)"});
      }
  return (
    <div className="click-image" style={{transform : source.transform}}>
      <div className="X" onClick={handleOnXClick}>
        <i className="fa-solid fa-xmark fa-2xl"></i>
      </div>
      <div className="image">
        <img src={source.src} alt="" />
      </div>
    </div>
  );
}

export default ClickImage;
