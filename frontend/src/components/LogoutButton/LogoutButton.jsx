import { useDispatch } from "react-redux";
import { logoutUser, reset } from "../../features/auth/authSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logoutUser());
    dispatch(reset());
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;