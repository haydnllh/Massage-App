import "./header.styles.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../LogoutButton/LogoutButton";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="main-header">
      <div className="container">
        <Link to="/">
          <h1 className="logo">Home</h1>
        </Link>

        <nav>
          <Link to="/">Home</Link>
          {user ? (
            user.isadmin ? (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <LogoutButton />
              </>
            ) : (
              <>
                <LogoutButton />
              </>
            )
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
