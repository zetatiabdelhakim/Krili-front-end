import React from "react";
import "./popupHolder.css";

function PopupHolder({ Component, set, s, user, setUser, offre = null }) {
  function handleOnXClick() {
    set.set({ transform: "scaleY(0)" });
  }
  return (
    <div className="popupHolder" style={s}>
      <div className="X" onClick={handleOnXClick}>
        <i className="fa-solid fa-xmark fa-2xl"></i>
      </div>
      {offre ? (
        <Component user={user} setUser={setUser} setStyle={set} offre={offre} />
      ) : (
        <Component user={user} setUser={setUser} setStyle={set} />
      )}
    </div>
  );
}

export default PopupHolder;
