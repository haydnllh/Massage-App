import "./header.styles.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="main-header">
      <Link to="/">
        <h1 className="logo">
          Willow wellness & sport therapy <br /> 柳树健康与运动疗法
        </h1>
      </Link>

      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        {user ? (
          user.isadmin ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link to="/bookings" onClick={() => setMenuOpen(false)}>
                Booking
              </Link>
              <LogoutButton />
            </>
          )
        ) : (
          <>
            <Link to="/bookings" onClick={() => setMenuOpen(false)}>
              Booking
            </Link>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
