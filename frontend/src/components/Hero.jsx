import React from "react";
import { FiLayers } from "react-icons/fi";
import "./style.css";

function Hero() {
  return (
    <div className="hero-wrapper">
      <div className="hero-card">
        <FiLayers className="hero-icon" size={45} />

        <h1 className="hero-title">
          Welcome to <span>PaperTime</span>
        </h1>

        <p className="hero-text">
          PaperTime is designed with one goal — to make student life easier.
          Access all <strong>AKTU University</strong> previous year question
          papers in one clean, fast, and user-friendly platform. Find what you
          need instantly and focus more on what matters — your studies.
        </p>
      </div>
    </div>
  );
}

export default Hero;
