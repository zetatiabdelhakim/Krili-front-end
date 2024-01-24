import React, { useEffect, useState } from "react";
import "./AddOffre.css";
import addMainImage from "../images/add-image-frame-svgrepo-com.svg";
import addImage from "../images/add-image-svgrepo-com.svg";
import image from "../images/R.jpeg";
import axios from "axios";
import Suggest from "../components/suggest";
import {
  deleteUserFromLocalStorage,
  addUserToLocalStorage,
  updateUserInLocalStorage,
  readUserFromLocalStorage,
} from "../functions/user";
import { Link, useNavigate } from "react-router-dom";

function AddOffre() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [otherImages, setOtherImages] = useState(["", "", "", "", "", ""]);
  const [addButton, setAddButton] = useState("insert");
  const [universites, setUnivs] = useState([]);
  const [element, setElm] = useState(null);
  const [offre, setOffre] = useState({ name: "", images: [] });
  const [user, setUser] = useState(readUserFromLocalStorage());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOffre({ ...offre, [name]: value });
  };

  const fetchUnivs = async () => {
    const { data } = await axios.get(`http://localhost:8080/getUniversites`);
    setUnivs(data.map((elm) => elm.name));
  };
  useEffect(() => {
    if (!readUserFromLocalStorage()) {
      navigate("/login");
    }
    fetchUnivs();
    setElm(document.querySelector(".AddOffre #univ"));
  }, []);

  const handleImageChange = (e) => {
    setError(null);
    const files = e.target.files;
    if (files.length !== 1) {
      setError("Veuillez selectionner une seule image.");
      e.target.value = "";
      return;
    }
    const file = files[0];
    if (!file.type.startsWith("image/")) {
      setError("Veuillez selectionner un fichier image.");
      e.target.value = "";
      return;
    }
    if (e.target.id === "main") {
      setMainImage(file);
    } else {
      let number = parseInt(e.target.id.charAt(5));
      let newArray = [...otherImages];
      newArray[number] = file;

      setOtherImages(newArray);

      if (newArray.filter((elm) => elm == "").length == 0) {
        setAddButton("insert hidden");
      }
    }
  };
  function handleAddOtherImages() {
    for (let i = 0; i < 6; i++) {
      if (otherImages[i] === "") {
        clickOn("input" + i);
        return;
      }
    }
  }
  function handelOnDeleteImage(e) {
    let number = parseInt(e.target.id.charAt(3));
    let newArray = [...otherImages];
    newArray[number] = "";
    document.getElementById("input" + number).value = "";
    setAddButton("insert");
    setOtherImages(newArray);
  }
  function clickOn(id) {
    document.getElementById(id).click();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mainImage == "") {
      setError("Vous devez selectionner l’image principale.");
      return;
    }
    let univ = document.getElementById("univ").value;
    if (!universites.includes(univ)) {
      setError("Vous devez choisir une universite parmi celles proposees.");
      return;
    }
    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("universite", univ);
    formData.append("prix", offre.prix);
    formData.append("logement", offre.logement);
    formData.append("genre", offre.genre);
    formData.append("localisation", offre.localisation);
    formData.append("contact", offre.contact);
    formData.append("images", mainImage);
    let newArray = otherImages.filter((elm) => elm != "");
    for (let i = 0; i < newArray.length; i++) {
      formData.append("images", newArray[i]);
    }
    await axios
      .post("http://localhost:8080/addOffre", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setOffre({ name: "", images: [] });
        setOtherImages(["", "", "", "", "", ""]);
        setMainImage("");
        updateUserInLocalStorage(response.data);
        navigate("/offres");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="AddOffre">
      <div className="ajouterOffre">
        <Link to="/offres">
          <a className="retour">
            {" "}
            <i className="fa-solid fa-arrow-left"></i>
          </a>
        </Link>
        <span>Ajouter Offre</span>
      </div>
      {error && (
        <div className="eroor">
          <i className="fa-solid fa-circle-exclamation">&nbsp;&nbsp; {error}</i>
        </div>
      )}
      <form action="" method="POST" onSubmit={handleSubmit}>
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
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="type">
            <span className="titre">Type de Logement :</span>
            <select
              name="logement"
              id=""
              className="select"
              required
              onChange={handleInputChange}
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
              required
              onChange={handleInputChange}
            >
              <option value=""></option>
              <option value="Neutre"> Neutre</option>
              <option value="Garcon">Garcon</option>
              <option value="Fille">Fille</option>
            </select>
          </div>
          <div className="prix">
            <span className="titre">Prix :</span>
            <input
              name="prix"
              type="number"
              className="input"
              placeholder="tapez un prix..."
              required
              min={"0"}
              max={"10000"}
              onChange={handleInputChange}
            />
          </div>
          <div className="localisation">
            <span className="titre">Localisation :</span>
            <input
              name="localisation"
              type="text"
              className="input"
              placeholder="tapez votre localisation..."
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="telephone">
            <span className="titre">Telephone :</span>
            <input
              name="contact"
              type="text"
              className="input"
              placeholder="tapez votre numero telephone..."
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="images">
            <span className="titre">Images :</span>
            <img
              src={
                mainImage != "" ? URL.createObjectURL(mainImage) : addMainImage
              }
              alt=""
              className="ajoutImage"
              onClick={() => {
                clickOn("main");
              }}
            />
            <input
              className="hidden"
              type="file"
              id="main"
              onChange={handleImageChange}
            />
            {mainImage == "" ? (
              <span></span>
            ) : (
              <i className="fa-solid fa-trash-can"></i>
            )}
          </div>
          <div className="inserted">
            {otherImages.map((elm, i) => (
              <div
                className={elm == "" ? "images-small hidden" : "images-small"}
                key={i}
              >
                <i className="fa-solid fa-trash-can"></i>
                <img
                  className="insert img"
                  src={elm == "" ? " " : URL.createObjectURL(elm)}
                  alt=""
                  id={"img" + i}
                  onClick={handelOnDeleteImage}
                />
                <input
                  className="hidden"
                  type="file"
                  id={"input" + i}
                  onChange={handleImageChange}
                />
              </div>
            ))}
            <img
              src={addImage}
              alt=""
              className={addButton}
              id="addButton"
              onClick={handleAddOtherImages}
            />
          </div>
        </div>
        <div className="valider">
          <input type="submit" value="Valider" className="buttonValider" />
        </div>
      </form>
    </div>
  );
}

export default AddOffre;
