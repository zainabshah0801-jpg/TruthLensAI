import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  return (
    <nav className="navbar">

      <NavLink to="/" className="logo">
        <span className="logo-symbol">◉</span>
        TruthLens <strong>AI</strong>
      </NavLink>

      <div className="nav-links">

        <NavLink to="/">
          Home
        </NavLink>

        <NavLink to="/verify">
          Verify
        </NavLink>

        <NavLink to="/how-it-works">
          How It Works
        </NavLink>

        <NavLink to="/features">
          Features
        </NavLink>

        <NavLink to="/about">
          About
        </NavLink>

      </div>

      <NavLink
        to="/verify"
        className="nav-button"
      >
        Try It Now →
      </NavLink>

    </nav>
  );
}

export default Navbar;