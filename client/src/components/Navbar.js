import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/signin" className="navbar-logo">
            YLSLC
            <i className="fab fa-typo3" />
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
