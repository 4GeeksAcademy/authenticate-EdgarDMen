import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      alert("Username or password cannot be empty");
    } else {
      const loginSuccess = await actions.login(username, password);
      if (loginSuccess) {
        navigate("/private"); // Navigates the user to the Private page
      }
    }
  };

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      navigate("/private"); 
    }
  }, [store.token, navigate]);

  return (
    <div className="body">
      <div className="text-center mt-5">
        <div>
          <div className="m-5">
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="m-5">
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button className="m-3 btn btn-primary" id="login" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
