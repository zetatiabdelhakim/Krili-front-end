import React, { useEffect } from "react";

import Footer from "../components/footer";
import Filter from "../components/filter";
import Navbar from "../components/navbar";
import WelcomeUser from "../components/welcomeUser";
import { useNavigate } from "react-router-dom";
import {
  deleteUserFromLocalStorage,
  addUserToLocalStorage,
  updateUserInLocalStorage,
  readUserFromLocalStorage,
} from "../functions/user";
function Home() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!readUserFromLocalStorage()) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Navbar where={1} />
      <WelcomeUser />
      <Filter />
      <Footer />
    </div>
  );
}

export default Home;
