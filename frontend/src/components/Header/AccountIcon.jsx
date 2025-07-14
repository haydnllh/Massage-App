import "./accountIcon.scss";
import Account from "../../Pages/Account/Account";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const AccountIcon = () => {
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div
      className="account-icon-container"
      onClick={() => setDropdown(!dropdown)}
    >
      <div className="icons">
        <MdOutlineAccountCircle />
        {dropdown ? (
          <IoMdArrowDropup className="spin" />
        ) : (
          <IoMdArrowDropdown className="spin" />
        )}
      </div>
      <div className={`${dropdown ? "show" : "hidden"} dropdown`}>
        <ul className="dropdown-list">
          <li>
            <MdManageAccounts />{" "}
            <NavLink to="/account/profile">My Profile</NavLink>
          </li>
          <li>
            <FaCalendarAlt /> <NavLink to="/account/bookings">My Bookings</NavLink>
          </li>
          <li onClick={handleLogout}>
            <IoLogOutOutline /> Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountIcon;
