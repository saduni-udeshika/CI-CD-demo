import "./logout.css";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

export default function Logout() {
  const navigate = useNavigate();
  const handleClick = (async) => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <button className="logout" onClick={handleClick}>
      <BiPowerOff />
    </button>
  );
}
