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
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;

// <div className="container ">
//   <hr />
//   <div className="row">
//     <div className="col-3 mt-3">
//       <img
//         src="images\logo.png"
//         alt="Logo"
//         style={{ width: "50%" }}
//       />
//       <p className="footerpara mt-3">
//         ©2025, PaperTime All rights reserved.
//       </p>

//       <div className="icons">
//         <i class="fa-brands fa-facebook"></i>
//         <i class="fa-brands fa-x-twitter"></i>
//         <i class="fa-brands fa-linkedin-in"></i>
//         <i class="fa-brands fa-instagram"></i>
//       </div>
//       <hr />
//     </div>
//     <div className="col-3 mt-5">
//         <p className="footer-text">
//       Your trusted exam partner - providing AKTU previous year papers at one place.
//     </p>
//     </div>
//     <div className="col-3"></div>
//     <div className="col-3"></div>
//   </div>
//   <div>
//     <p style={{color:"#666"}}>
//         Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances
//     </p>
//   </div>
// </div>
