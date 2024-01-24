import React, { useEffect } from "react";
import FavorisHolder from "../components/FavorisHolder";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import {
  deleteUserFromLocalStorage,
  addUserToLocalStorage,
  updateUserInLocalStorage,
  readUserFromLocalStorage,
} from "../functions/user";
function Favoris() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!readUserFromLocalStorage()) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="favoris-page">
      <Navbar where={2} />
      <FavorisHolder />
      <Footer />
    </div>
  );
}

export default Favoris;
