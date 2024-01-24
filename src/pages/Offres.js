import React, { useEffect } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import {
  deleteUserFromLocalStorage,
  addUserToLocalStorage,
  updateUserInLocalStorage,
  readUserFromLocalStorage,
} from "../functions/user";
import OffrirHolder from "../components/OffrirHolder";
function Offres() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!readUserFromLocalStorage()) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="Offres">
      <Navbar where={3} />
      <OffrirHolder />
      <Footer />
    </div>
  );
}
export default Offres;
