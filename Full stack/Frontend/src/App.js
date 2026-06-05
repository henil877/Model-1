import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./Header";
import ApiCalling from "./ApiCalling";
import Showuser from "./Pages/Showuser";
import Home from "./Pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/model_1_StaticWeb/Register.html" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Header" element={<Header />} />
      <Route path="/ApiCalling" element={<ApiCalling />} />
      <Route path="/showuser" element={<Showuser />} />
    </Routes>
  );
}

export default App;
