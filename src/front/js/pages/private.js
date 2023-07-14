import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css"

export const Private = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  console.log('Token in Private:', store.token);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const response = await fetch('/api/logged_in', {
        method: 'GET',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!data.logged_in) {
        navigate("/login");
      }
    };
  
    
 
    checkLoggedIn();
  }, [navigate]);

  const handleLogout = async () => {
    await actions.logout();
    navigate("/login");
  };


  return (
    <div>
      <h1>This is your private page</h1>
      <p>Congratulations</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
