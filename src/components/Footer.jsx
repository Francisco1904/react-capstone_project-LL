import { Link } from "react-router-dom";
import logo from "../assets/lemon_logo.svg";

function Footer() {
  return (
    <footer role="contentinfo" className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logo} alt="Little Lemon Restaurant Logo" width="220" />
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <h3 id="footer-nav-heading">Site</h3>
          <ul aria-labelledby="footer-nav-heading">
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
        <aside className="footer-contact">
          <h3 id="contact-heading">Contact</h3>
          <address aria-labelledby="contact-heading">
            <p>123 Lemon Street, Food City</p>
            <p>
              Phone: <a href="tel:+11234567890">(123) 456-7890</a>
            </p>
            <p>
              Email:{" "}
              <a href="mailto:contact@littlelemon.com">
                contact@littlelemon.com
              </a>
            </p>
          </address>
        </aside>
        <aside className="footer-social">
          <h3 id="social-heading">Social Media</h3>
          <ul aria-labelledby="social-heading">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Instagram page (opens in a new tab)"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://tripadvisor.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                TripAdvisor
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </footer>
  );
}

export default Footer;
