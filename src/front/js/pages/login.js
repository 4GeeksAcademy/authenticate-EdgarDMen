import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";



export const Login = () => {
  const { store, actions } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();



  const handleSubmit = async (e) => {
    console.log("text")
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    const loginSuccess = await actions.login(username, password);
    console.log("Login success:", loginSuccess);
  };



  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      history("/explore");
    }
  }, [store.token, history]);

  const handleSignUpPage = () => {
    history("/signup");
    actions.signup(username, password);
  };

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
          <div className="d-flex justify-content-center allign-items-center">
          <button className="m-3 btn btn-primary" id="login" onClick={handleSubmit}>
            Login
          </button>                                                            
          <button className="m-3 btn btn-primary" id="login" onClick={handleSignUpPage}>    
            Sign Up
          </button>
          </div>
        </div>
      </div>
    
    </div>
  );
};