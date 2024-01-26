import React, { useEffect, useRef, useState } from "react";
import "./AdminHolder.css";
import {
  deleteUserFromLocalStorage,
  addUserToLocalStorage,
  updateUserInLocalStorage,
  readUserFromLocalStorage,
} from "../functions/user";
import OffreAdmine from "./OffreAdmine";
import axios from "axios";
import PopupHolder from "./popupHolder";
import AttentionAjouterUniv from "./AttentionAjouterUniv";
function AdminHolder() {
  let [offres, setOffres] = useState([]);
  let [univ, setUniv] = useState("");
  let [home, setHome] = useState(true);
  let [onPlus, setOnPlus] = useState(false);
  let [popAjouter, setPopAjouter] = useState({ transform: "scaleY(0)" });
  const [user, setUser] = useState(readUserFromLocalStorage());
  function handleOnAjouter() {
    if (univ) {
      setPopAjouter({ transform: "scaleY(1)" });
    }
  }
  useEffect(() => {
    fetchOffres();
  }, []);
  const fetchOffres = async () => {
    const { data } = await axios.get("http://localhost:8080/offres");
    setOffres(data);
  };
  useEffect(() => {
    fetchOffres();
  }, [user]);
  function handelHomeListClick() {
    setHome(!home);
  }
  function handleOnPlus() {
    setOnPlus(!onPlus);
  }
  const inputRef = useRef(null);

  useEffect(() => {
    if (onPlus) {
      inputRef.current.focus();
    }
  }, [onPlus]);
  function handleOnBlur(e) {
    setTimeout(() => {
      setOnPlus(false);
    }, 1000);
  }
  function handelOnFocus() {
    setUniv("");
  }
  function handelOnChange() {
    setUniv(inputRef.current.value);
  }

  return (
    <div className="AdminHolder">
      <PopupHolder
        Component={AttentionAjouterUniv}
        user={user}
        setUser={setUser}
        s={popAjouter}
        set={{ set: setPopAjouter }}
        offre={univ}
      />
      <div className="actions">
        {home ? (
          <>
            {onPlus ? (
              <p>
                <i
                  className="fa-solid fa-chevron-down"
                  onClick={handleOnAjouter}
                ></i>
                <input
                  type="text"
                  ref={inputRef}
                  onBlur={handleOnBlur}
                  onChange={handelOnChange}
                  onFocus={handelOnFocus}
                />
              </p>
            ) : (
              <p>
                <i className="fa-solid fa-plus" onClick={handleOnPlus}></i>
                Ajouter université
              </p>
            )}
            <i
              className="fa-solid fa-list-check"
              onClick={handelHomeListClick}
            ></i>
          </>
        ) : (
          <>
            <p>Offres Valides</p>{" "}
            <i className="fa-solid fa-house" onClick={handelHomeListClick}></i>
          </>
        )}
      </div>
      <hr className="hr" />
      {offres.length !== 0 ? (
        <div className="offres">
          {" "}
          {offres
            .filter((elm) => elm.verified != home)
            .map((elm) => (
              <OffreAdmine
                key={elm.id}
                theOffre={elm}
                user={user}
                setUser={setUser}
                setOffres={setOffres}
              />
            ))}
        </div>
      ) : (
        <div className="notFound">
          <i className="fa-solid fa-face-sad-tear fa-xl">
            &nbsp;&nbsp;&nbsp;&nbsp;Aucune offre
          </i>
        </div>
      )}

      <hr />
    </div>
  );
}

export default AdminHolder;
