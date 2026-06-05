import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import ApiCalling from "./ApiCalling";
import Showuser from "./Pages/Showuser";
import Home from "./Pages/Home";

function RedirectToRegister() {
  useEffect(() => {
    window.location.href = "/model_1_StaticWeb/Register.html";
  }, []);

  return null;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<RedirectToRegister />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Header" element={<Header />} />
      <Route path="/ApiCalling" element={<ApiCalling />} />
      <Route path="/showuser" element={<Showuser />} />
    </Routes>
  );
}

export default App;
