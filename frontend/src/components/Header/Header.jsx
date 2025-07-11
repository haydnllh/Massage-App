import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutUser, reset } from "../../features/auth/authSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const LogoutButton = () => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
      setMenuOpen(false);
      dispatch(logoutUser());
      dispatch(reset());
      navigate("/");
    };

    return (
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    );
  };

  return (
    <header className="main-header">
      <Link to="/">
        <h1 className="logo">
          Willow wellness & sport therapy
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
              <button
                className="book-online"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/bookings");
                }}
              >
                Book Online
              </button>
              <LogoutButton />
            </>
          )
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>
              Register
            </Link>
            <button
              className="book-online"
              onClick={() => {
                setMenuOpen(false);
                navigate("/bookings");
              }}
            >
              Book Online
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
