import React from "react";
import "./Home.css"
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import image from '../../../src/image.png';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
       <div className="container" > 
      <img src={image} alt="Snow"/>
      <div className="homebtn">
        <Button variant="contained" color="success" size="large" onClick={() => navigate("/employee")} >Employee</Button>
        <Button variant="contained" color='success' size="large" onClick={() => navigate("/manager")}>Manager</Button>
      </div>
      </div> 
    </div>
  );
};

export default Home;
