import React, { useEffect } from "react";

import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import {
  deleteUserFromLocalStorage,
  addUserToLocalStorage,
  updateUserInLocalStorage,
  readUserFromLocalStorage,
} from "../functions/user";
import NavAdmin from "../components/navAdmin";
import OffreAdmine from "../components/OffreAdmine";
import AdminHolder from "../components/AdminHolder";
function Home() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!readUserFromLocalStorage()) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <NavAdmin />
      <AdminHolder />
      <Footer />
    </div>
  );
}

export default Home;
