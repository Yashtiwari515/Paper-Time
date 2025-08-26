import React from "react";
function Navbar() {
  return (
    <div className='container'>
        <div className='row'>
            <img src="images\logo.png" alt="Logo" style={{ width: "20%" }} />
        </div>
        <hr style={{color: "#474747", marginBottom:"5rem",marginTop:"0"}} />
    </div>
  );
}

export default Navbar;
