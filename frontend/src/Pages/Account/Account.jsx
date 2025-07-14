import { Outlet, NavLink } from "react-router-dom";

const Account = () => {
  return (
    <div className="account-container">
      <aside className="sidebar">
        <ul>
          <li>
            <NavLink to="profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="bookings">Bookings</NavLink>
          </li>
        </ul>
      </aside>

      <main className="account-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Account;
