import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom"; // Add NavLink import
import logo from "../assets/Logo.png";
import hamburgerIcon from "../assets/hamburger_menu_icon.svg";
import SkipLink from "./SkipLink";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Toggle menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking a link
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Add scroll detection
  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled state based on scroll position
      setIsScrolled(window.scrollY > 0);
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Initial check (in case page loads already scrolled)
    handleScroll();

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <>
      <SkipLink />
      <header
        role="banner"
        className={`header ${isScrolled ? "scrolled" : ""}`}
      >
        <div className="header-wrapper">
          <button
            className={`mobile-menu-toggle ${isMenuOpen ? "menu-open" : ""}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
          >
            {isMenuOpen ? (
              <span className="back-arrow">←</span>
            ) : (
              <img src={hamburgerIcon} alt="" />
            )}
          </button>

          <div className="image-wrapper">
            <Link to="/">
              <img src={logo} alt="Little Lemon Restaurant Logo" width="200" />
            </Link>
          </div>

          <nav
            id="primary-navigation"
            aria-label="Main navigation"
            className={isMenuOpen ? "mobile-menu-open" : ""}
          >
            <ul>
              <li>
                <Link to="/" onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li>
                <NavLink to="/about" onClick={closeMenu}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/menu" onClick={closeMenu}>
                  Menu
                </NavLink>
              </li>
              <li>
                <NavLink to="/reservations" onClick={closeMenu}>
                  Reservations
                </NavLink>
              </li>
              <li>
                <NavLink to="/order-online" onClick={closeMenu}>
                  Order Online
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Overlay that appears behind the menu */}
          {isMenuOpen && (
            <div
              className="menu-overlay"
              onClick={closeMenu}
              aria-hidden="true"
            ></div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
