import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";

function Header() {
  return (
    <header>
      <div className="header-wrapper">
        <div className="image-wrapper">
          <Link to="/">
            <img src={logo} alt="Little Lemon Logo" />
          </Link>
        </div>
        <nav aria-label="Main navigation">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/reservations">Reservations</Link>
            </li>
            <li>
              <Link to="/order-online">Order Online</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
