import React from "react";
import "./Home.css"
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mainButton">
        <Button variant="contained" color="success" size="large" onClick={() => navigate("/employee")} className="button">Employee</Button>
        <Button variant="contained" color='success' size="large" onClick={() => navigate("/manager")}>Manager</Button>
      </div>

    </div>
  );
};

export default Home;
