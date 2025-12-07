import React from "react";

function Footer() {
  return (
    <div className="container">
      <div className="row">
        <footer className="footer">
          <div className="footer-container">
            <h2 className="footer-logo">
              {" "}
              <img src="images\newbg.png" alt="logo" style={{ width: "13%" }} />
            </h2>
            <p className="footer-text">
              Your trusted exam partner - providing AKTU previous year papers at
              one place.
            </p>
            <p className="footer-copy">
              © {new Date().getFullYear()} PaperTime. All rights reserved.
            </p>
            <p className="footer-own">
              Made by Yash Tiwari 
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;