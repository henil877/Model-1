import React from "react";
import { Routes, Route } from "react-router-dom";


import Register from "./Pages/Registration";
import Header from "./Header";
import ApiCalling from "./ApiCalling";
import Showuser from "./Pages/Showuser";
import Home from "./Pages/Home";


function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/Header" element={<Header/>}/>
      <Route path="/Register" element={<Register />} />
      <Route path="/ApiCalling" element={<ApiCalling />} />
      <Route path="/showuser" element={<Showuser />} />
      

    </Routes>
    
  );
}

export default App;

