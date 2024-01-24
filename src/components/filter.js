import React, { useEffect, useState } from "react";
import "./filter.css";
import Suggest from "./suggest";
import axios from "axios";
import image from "../images/R.jpeg";
import OffreClient from "./offreClient";
function Filter() {
  let [element, setElm] = useState(null);
  let [universites, setUnivs] = useState([]);
  let [offres, setOffres] = useState([]);
  let [offresToDisplay, setOffresToDisplay] = useState([]);
  
  let [infoFilter, setInfoFilter] = useState({
    prix: { min: new Set(), max: new Set() },
    genre: "",
    universite: "",
    logement: "",
  });
  useEffect(() => {
    let a = offres.filter(
      (elm) =>
        (infoFilter.genre == "" || infoFilter.genre == elm.genre) &&
        (infoFilter.logement == "" || infoFilter.logement == elm.logement) &&
        (infoFilter.universite == "" ||
          infoFilter.universite == elm.universite) &&
        (infoFilter.prix.min.size == 0 ||
          elm.prix >= Math.min(...Array.from(infoFilter.prix.min))) &&
        (infoFilter.prix.max.size == 0 ||
          elm.prix <= Math.max(...Array.from(infoFilter.prix.max)))
    );
    setOffresToDisplay(a);
    console.log(a);
  }, [infoFilter]);
  const fetchUnivs = async () => {
    const { data } = await axios.get(`http://localhost:8080/getUniversites`);
    setUnivs(data.map((elm) => elm.name));
  };
  useEffect(() => {
    setElm(document.querySelector(".filter #univ"));
    fetchUnivs();
    fetchOffres();
  }, []);

  function handeleOnInput(e) {
    setTimeout(() => {
      setInfoFilter({ ...infoFilter, [e.target.name]: e.target.value });
    }, 500);
  }
  function handelCheck(min, max, e) {
    if (e.target.checked) {
      setInfoFilter({
        ...infoFilter,
        prix: {
          min: infoFilter.prix.min.add(min),
          max: infoFilter.prix.max.add(max),
        },
      });
    } else {
      let min_ = infoFilter.prix.min;
      let max_ = infoFilter.prix.max;
      max_.delete(max);
      min_.delete(min);
      setInfoFilter({
        ...infoFilter,
        prix: {
          min: min_,
          max: max_,
        },
      });
    }
  }

  const fetchOffres = async () => {
    const { data } = await axios.get("http://localhost:8080/offres");
    setOffres(data);
    setOffresToDisplay(data);
  };

  // end
  return (
    <div className="filter">
      <div className="annonce">Annonces de Logement</div>
      <div className="filtre2">
        <div className="universite">
          <span className="titre">Université : </span>
          {element && (
            <Suggest element={element} data={universites} optionsNumber={3} />
          )}
          <input
            id="univ"
            name="universite"
            type="text"
            className="input"
            placeholder="tapez une université..."
            onBlur={handeleOnInput}
          />
        </div>
        <div className="type">
          <span className="titre">Type de Logement :</span>
          <select
            name="logement"
            id=""
            className="select"
            onChange={handeleOnInput}
          >
            <option value="" defaultValue={""}></option>
            <option value="Garconnaire">Garconnaire</option>
            <option value="Appartement">Appartement</option>
          </select>
        </div>
        <div className="genre">
          <span className="titre"> Genre souhaite:</span>
          <select
            name="genre"
            id=""
            className="select"
            onChange={handeleOnInput}
          >
            <option value="" defaultValue={""}>
              Neutre
            </option>
            <option value="Garcon">Garcon</option>
            <option value="Fille">Fille</option>
          </select>
        </div>
      </div>
      <div className="prix">
        <span className="titre">Prix :</span>
        <input
          type="checkbox"
          name="p1"
          id=""
          className="prixInput"
          onChange={(e) => {
            handelCheck(-Infinity, 1500, e);
          }}
        />{" "}
        <label htmlFor="" className="label1">
          moins de 1500DH
        </label>
        <input
          type="checkbox"
          name="p2"
          id=""
          className="prixInput"
          onChange={(e) => {
            handelCheck(1500, 2500, e);
          }}
        />{" "}
        <label htmlFor="" className="label1">
          1500DH - 2500DH
        </label>
        <input
          type="checkbox"
          name="p3"
          id=""
          className="prixInput"
          onChange={(e) => {
            handelCheck(2500, 3500, e);
          }}
        />{" "}
        <label htmlFor="" className="label1">
          2500DH- 3500DH
        </label>
        <input
          type="checkbox"
          name="p4"
          id=""
          className="prixInput"
          onChange={(e) => {
            handelCheck(3500, Infinity, e);
          }}
        />{" "}
        <label htmlFor="" className="label1">
          plus de 3500DH
        </label>
      </div>

      <hr className="hr" />
      {offresToDisplay.length !== 0 ? (
        <div className="offres">
          {" "}
          {offresToDisplay.map((elm) => (
            <OffreClient theOffre={elm} key={elm.id} />
          ))}
        </div>
      ) : (
        <div className="notFound">
          <i className="fa-solid fa-face-sad-tear fa-xl">
            &nbsp;&nbsp;&nbsp;&nbsp;aucune offre correspondant a ce filtre n’a
            ete trouvee
          </i>
        </div>
      )}

      <hr />
    </div>
  );
}

export default Filter;
