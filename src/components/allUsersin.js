import React from "react";
import "./allUsersin.css";

function AllUsersin({ users, s, set }) {
  function handleClick() {
    set.set({ ...s, transform: "scale(0)" });
  }
  return (
    <div className="on-cercle-red-click" style={s} onClick={handleClick}>
      
      {users.map((elm, i) => (
        <div className="overlap" key={i}>
          <div className="text-wrapper">{elm.name}</div>
          <div className="text-wrapper-2">{elm.phone}</div>
        </div>
      ))}
      <p onClick={handleClick}><i className="fa-solid fa-xmark"></i></p>
    </div>
  );
}

export default AllUsersin;
