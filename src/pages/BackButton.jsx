import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../App.css";

const BackButton = () => {
  return (
    <Link to="/" className="back-button">
      ← Voltar
    </Link>
  );
};

export default BackButton;