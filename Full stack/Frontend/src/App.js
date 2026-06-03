import React from "react";
import { Routes, Route } from "react-router-dom";


import Register from "./Pages/Registration";
import Header from "./Header";
import ApiCalling from "./ApiCalling";


function App() {
  return (
    <Routes>

      <Route path="/" element={<Header />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/ApiCalling" element={<ApiCalling />} />
      

    </Routes>
    
  );
}

export default App;

