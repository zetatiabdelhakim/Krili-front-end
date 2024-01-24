import React from "react";
import "./popupHolder.css";

function PopupHolder({ Component, set, s, user, setUser }) {
  function handleOnXClick() {
    set.set({ transform: "scaleY(0)" });
  }
  return (
    <div className="popupHolder" style={s}>
      <div className="X" onClick={handleOnXClick}>
        <i className="fa-solid fa-xmark fa-2xl"></i>
      </div>
      <Component user={user} setUser={setUser} setStyle={set}/>
    </div>
  );
}

export default PopupHolder;
