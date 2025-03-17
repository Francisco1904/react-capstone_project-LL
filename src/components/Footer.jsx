import { Link } from "react-router-dom";
import logo from "../assets/lemon_logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logo} alt="Little Lemon Logo" width="120" />
        </div>
        <nav className="footer-nav">
          <h3>Site</h3>
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
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <aside className="footer-contact">
          <h3>Contact</h3>
          <p>123 Lemon Street, Food City</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: contact@littlelemon.com</p>
        </aside>
        <aside className="footer-social">
          <h3>Social Media</h3>
          <ul>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
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
