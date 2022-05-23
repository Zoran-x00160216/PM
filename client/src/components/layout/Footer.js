import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="shadow bg-white fs-6">
      <div className="container">
        <div className="py-3 mt-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3 footerOverlay">
            <li className="nav-item">
              <Link to="/" className="nav-link px-2 text-muted">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link px-2 text-muted">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/FAQs" className="nav-link px-2 text-muted">
                FAQs
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link px-2 text-muted">
                About
              </Link>
            </li>
          </ul>
          <p className="text-center textPrimary">
            &copy; X00160216 Zoran Railic 2022
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
