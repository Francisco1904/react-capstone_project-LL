import logo from "../assets/Logo.svg"; // Adjust path if needed

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-logo">
          <img src={logo} alt="Little Lemon Logo" width="120" />
        </div>

        {/* Doormat Navigation */}
        <nav className="footer-nav">
          <h3>Site</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Menu</a>
            </li>
            <li>
              <a href="#">Reservations</a>
            </li>
            <li>
              <a href="#">Order Online</a>
            </li>
            <li>
              <a href="#">Login</a>
            </li>
          </ul>
        </nav>

        {/* Contact Information */}
        <div className="footer-contact">
          <h3>Contact</h3>
          <p>123 Lemon Street, Food City</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: contact@littlelemon.com</p>
        </div>

        {/* Social Media Links */}
        <div className="footer-social">
          <h3>Social Media</h3>
          <ul>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">TripAdvisor</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
