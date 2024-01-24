import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Home from "./pages/Home";
import SignUp from "./pages/signUp";
import Login from "./pages/login";
import AddOffre from "./pages/AddOffre";
import Favoris from "./pages/favoris";
export default function Page() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/signUp" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/addOffre" element={<AddOffre />} />
        <Route exact path="/favoris" element={<Favoris />} />
      </Routes>
    </Router>
  );
}
