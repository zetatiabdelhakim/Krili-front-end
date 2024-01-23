import React, { useEffect } from "react";
import NavIndex from "../components/NavIndex";
import Bienvenue from "../components/bienvenue";
import Footer from "../components/footer";
import Filter from "../components/filter";
import {
  deleteUserFromLocalStorage,
  addUserToLocalStorage,
  updateUserInLocalStorage,
  readUserFromLocalStorage,
} from "../functions/user";
import { useNavigate } from "react-router-dom";
function Index() {
  let navigate = useNavigate();

  useEffect(() => {
    if (readUserFromLocalStorage()) {
      let user = readUserFromLocalStorage();
      if (user.isAdmin) {
        // navigate("/admin");
      } else {
        navigate("/home");
      }
    }
  }, []);
  return (
    <div>
      <NavIndex />
      <Bienvenue />
      <Filter />
      <Footer />
    </div>
  );
}

export default Index;
