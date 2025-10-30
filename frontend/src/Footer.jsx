import React from "react";

function Footer() {
  return (
    <div className="container">
      <div className="row">
        <footer className="footer">
          <hr style={{ color: "#474747", marginTop: "5rem" }} />
          <div className="footer-container">
            <h2 className="footer-logo">
              {" "}
              <img src="images\logo.png" alt="logo" style={{ width: "15%" }} />
            </h2>
            <p className="footer-text">
              Your trusted exam partner - providing AKTU previous year papers at
              one place.
            </p>
            <div className="footer-links">
              <a href="#">About</a>
              <a href="#">Contact</a>
              <a href="#">Privacy Policy</a>
            </div>
            <p className="footer-copy">
              © {new Date().getFullYear()} PaperTime. All rights reserved.
            </p>
            <p className="footer-own">
              Made by Yash Tiwari 😎
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;