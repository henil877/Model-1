import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import "./Register.css";

function Registration() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/users`, {
        name,
        email,
        password,
      })
      .then(() => {
        alert("Registration Successful");
        navigate("/showuser");
      })
      .catch(() => {
        setError("Registration Failed");
      });
  };

  return (
    <>
      <Header />
   
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Register Form</h2>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Register</button>
        </form>
      </div>
      
    </>
  );
}

export default Registration;