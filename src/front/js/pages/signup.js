import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";




export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault(); 
    if (password === confirmPassword) {
      const success = await actions.signup(username, password);
      if (success) {
        history("/login");
      }
    } else if (password !== confirmPassword) {
      console.log("Passwords do not match");
      alert("Passwords do not match");
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
        <input
                  type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />
        <button className="m-3 btn btn-primary" type="submit" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
  );
};