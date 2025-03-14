import logo from "../assets/Logo.svg";
import Nav from "./Nav";

function Header() {
  return (
    <header>
      <img src={logo} alt="Little Lemon Logo" width="150" />
      <Nav />
    </header>
  );
}

export default Header;
