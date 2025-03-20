import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import hamburgerIcon from "../assets/hamburger_menu_icon.svg";

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
    <header className={isScrolled ? "scrolled" : ""}>
      <div className="header-wrapper">
        <button
          className={`mobile-menu-toggle ${isMenuOpen ? "menu-open" : ""}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            // If you have a back arrow SVG:
            // <img src={backArrowIcon} alt="" />

            // If you don't have a back arrow SVG, we'll use a Unicode arrow character instead:
            <span className="back-arrow">←</span>
          ) : (
            <img src={hamburgerIcon} alt="" />
          )}
        </button>

        <div className="image-wrapper">
          <Link to="/">
            <img src={logo} alt="Little Lemon Logo" />
          </Link>
        </div>

        <nav
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
              <Link to="/about" onClick={closeMenu}>
                About
              </Link>
            </li>
            <li>
              <Link to="/menu" onClick={closeMenu}>
                Menu
              </Link>
            </li>
            <li>
              <Link to="/reservations" onClick={closeMenu}>
                Reservations
              </Link>
            </li>
            <li>
              <Link to="/order-online" onClick={closeMenu}>
                Order Online
              </Link>
            </li>
          </ul>
        </nav>

        {/* Overlay that appears behind the menu */}
        {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
      </div>
    </header>
  );
}

export default Header;
