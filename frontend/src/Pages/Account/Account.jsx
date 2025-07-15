import "./account.scss";
import { Outlet, NavLink } from "react-router-dom";

const Account = () => {


  return (
    <div className="account-container">
      <aside>
        <div className="sidebar">
          <h2>Account</h2>
          <div>
            <NavLink className={`nav ${({isActive}) => (isActive ? "active" : "")}`} to="profile">Profile</NavLink>
            <hr />
          </div>
          <div>
            <NavLink className={`nav ${({isActive}) => (isActive ? "active" : "")}`} to="bookings">Bookings</NavLink>
            <hr />
          </div>
        </div>
      </aside>

      <main className="account-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Account;
