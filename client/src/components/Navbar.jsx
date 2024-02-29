import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            YLSLC
            <i className="fab fa-typo3" />
          </Link>
          <Link to="/signin" className="navbar-logo">
            Sign In
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
