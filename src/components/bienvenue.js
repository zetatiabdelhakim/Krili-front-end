import React from "react";
import "./bienvenue.css";
import image from "../images/21852399_students_09.svg";
import { Link } from "react-router-dom";
function Bienvenue() {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div className="bienvenue">
        <div className="students">
          {" "}
          <img src={image} alt="" className="studentsPic" />
        </div>
        <div className="message">
          Cher étudiant, bienvenue sur notre plateforme dédiée à simplifier
          votre recherche de logement universitaire. Que vous cherchiez un
          espace confortable pour étudier ou que vous soyez un propriétaire
          souhaitant offrir un logement adapté, vous êtes au bon endroit. Nous
          vous offrons un espace où vos besoins personnels et financiers
          rencontrent des offres de location diverses et adaptées. Explorez
          notre site pour trouver le logement idéal qui répondra à vos exigences
          et facilitera votre parcours universitaire.{" "}
        </div>
      </div>

      <div className="inscription">
        <div className="messageInscription">
          Bienvenue dans notre communauté de locations étudiantes, où la
          recherche de logement devient simple et efficace pour tous.
        </div>
        <Link to="/signUp">
          <button className="sinscrire">S'inscrire</button>
        </Link>
      </div>
    </div>
  );
}

export default Bienvenue;
