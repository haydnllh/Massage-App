import { useDispatch } from "react-redux";
import { logoutUser, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./LogoutButton.styles.scss";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate("/");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
