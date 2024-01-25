import React, { useEffect, useState } from "react";
import "./EditOffre.css";
import addMainImage from "../images/green add image.svg";
import addImage from "../images/add-image-svgrepo-com.svg";
import axios from "axios";
import Suggest from "../components/suggest";
import {
  deleteUserFromLocalStorage,
  addUserToLocalStorage,
  updateUserInLocalStorage,
  readUserFromLocalStorage,
} from "../functions/user";
import { Link, useNavigate } from "react-router-dom";

function EditOffre({ user, setUser, setStyle, offre }) {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [otherImages, setOtherImages] = useState(["", "", "", "", "", ""]);
  const [addButton, setAddButton] = useState("insert");
  const [universites, setUnivs] = useState([]);
  const [element, setElm] = useState(null);
  const [offre_, setOffre] = useState({ name: "", images: [] });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOffre({ ...offre_, [name]: value });
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
    setElm(document.querySelector(".EditOffre #univ_" + offre.id));
    setMainImage(blobToFile(offre.images[0].data));
    let newArray = ["", "", "", "", "", ""];
    for (let i = 1; i < offre.images.length; i++) {
      newArray[i - 1] = blobToFile(offre.images[i].data);
    }
    setOtherImages(newArray);
    if (newArray.filter((elm) => elm == "").length == 0) {
      setAddButton("insert hidden");
    }

    // ***********************

    setOffre({
      ...offre_,
      universite: offre.universite,
      prix: offre.prix,
      logement: offre.logement,
      genre: offre.genre,
      localisation: offre.localisation,
      contact: offre.contact,
    });
  }, []);
  function blobToFile(blobe) {
    const base64ImageString = blobe;
    const binaryString = window.atob(base64ImageString);
    const binaryData = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      binaryData[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([binaryData], { type: "image/jpeg" });

    const fileName = "example.jpg";
    const imageFile = new File([blob], fileName, { type: "image/jpeg" });

    return imageFile;
  }
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
    if (e.target.id === "main_" + offre.id) {
      setMainImage(file);
    } else {
      let number = parseInt(e.target.id.charAt(6));
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
        clickOn("input_" + i + offre.id);
        return;
      }
    }
  }
  function handelOnDeleteImage(e) {
    let number = parseInt(e.target.id.charAt(4));
    let newArray = [...otherImages];
    newArray[number] = "";
    document.getElementById("input_" + number + offre.id).value = "";
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
    let univ = document.getElementById("univ_" + offre.id).value;
    if (!universites.includes(univ)) {
      setError("Vous devez choisir une universite parmi celles proposees.");
      return;
    }
    const formData = new FormData();
    formData.append("offreId", offre.id);
    formData.append("universite", univ);
    formData.append("prix", offre_.prix);
    formData.append("logement", offre_.logement);
    formData.append("genre", offre_.genre);
    formData.append("localisation", offre_.localisation);
    formData.append("contact", offre_.contact);
    formData.append("images", mainImage);
    let newArray = otherImages.filter((elm) => elm != "");
    for (let i = 0; i < newArray.length; i++) {
      formData.append("images", newArray[i]);
    }
    await axios
      .put("http://localhost:8080/editOffre", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setOffre({ name: "", images: [] });
        setOtherImages(["", "", "", "", "", ""]);
        setMainImage("");
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .post("http://localhost:8080/login", {
        login: user.login,
        password: user.password,
      })
      .then((response) => {
        updateUserInLocalStorage(response.data);
        setUser(response.data);
      });
    setStyle.set({ transform: "scaleY(0)" });
    window.location.reload()
  };

  return (
    <div className="EditOffre">
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
              id={"univ_" + offre.id}
              name="universite"
              type="text"
              className="input"
              placeholder="tapez une université..."
              required
              onChange={handleInputChange}
              onFocus={handleInputChange}
              value={offre_.universite}
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
              value={offre_.logement}
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
              value={offre_.genre}
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
              value={offre_.prix}
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
              value={offre_.localisation}
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
              value={offre_.contact}
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
                clickOn("main_" + offre.id);
              }}
            />
            <input
              className="hidden"
              type="file"
              id={"main_" + offre.id}
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
                  id={"img_" + i + offre.id}
                  onClick={handelOnDeleteImage}
                />
                <input
                  className="hidden"
                  type="file"
                  id={"input_" + i + offre.id}
                  onChange={handleImageChange}
                />
              </div>
            ))}
            <img
              src={addImage}
              alt=""
              className={addButton}
              id={`addButton_${offre.id}`}
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

export default EditOffre;
