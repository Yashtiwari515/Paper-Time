import React from "react";
function Navbar() {
  return (
    <div className='container'>
        <div className='row'>
            <img src="images\logo.png" alt="Logo" style={{ width: "20%" }} />
        </div>
        <hr style={{color: "#474747", marginBottom:"5rem",marginTop:"0"}} />
    </div>
    // <nav
    //   className="navbar navbar-expand-lg border-bottom mb-3"
    // >
    //   <div className="container p-3">
    //       <img src="images\logo.png" alt="Logo" style={{ width: "20%" }} />

    //     <div className="collapse navbar-collapse navbar1" id="navbarSupportedContent">
    //       <form className="d-flex" role="search">
    //         <ul className="navbar-nav me-auto mx-5 mb-2 mb-lg-0">
    //           <li className="nav-item mx-5">
    //               Pricing
    //           </li>
    //           <li className="nav-item mx-5">
    //               Product
    //           </li>
    //           <li className="nav-item mx-5">
    //               About
    //           </li>
              
    //         </ul>
    //       </form>
    //     </div>
    //   </div>
    // </nav>
  );
}

export default Navbar;
