import React from "react";
import "./style.css";

function Hero() {
  return (
    <div className="container space">
      <div className="row">
        <div className="para-box mt-3">
          <p className="fs-4 para fw-bold">
            PaperTime has been created with a simple mission - to make it easier
            for students to access all the important study materials in one
            place. Here, you'll find a complete collection of{" "}
            <strong>AKTU University</strong> {" "}
             previous year question papers. With a clean, student-friendly
            interface, PaperTime ensures that you save time searching and spend
            more time focusing on what truly matters: your studies.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
