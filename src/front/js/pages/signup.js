import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";




export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword] = useState("");
  const history = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault(); 
    if (password === password) {
      const success = await actions.signup(username, password);
      if (success) {
        history("/login");
      }
    } else if (password !== password) {
      console.log("How");
    } else {
      alert("Username/password Incorrect");
      console.log("username/password Incorrect");
    }
  };


  return (
      <div>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="password"
        />
        <button className="m-3 btn btn-primary" type="submit" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
  );
};