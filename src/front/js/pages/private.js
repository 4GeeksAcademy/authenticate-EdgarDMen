import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const history = useNavigate();

  useEffect(() => {
    if (!store.token || store.token === "") {
      history("/login");
    }
  }, [store.token, history]);

  const handleLogout = async () => {
    await actions.logout(); 
    history("/login");
  };

  return (
    <div>
      <h1>This is your private page</h1>
      <p>Congratulations</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
