import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const UserProtectedRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export const AdminProtectedRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  return user ? (
    user.isadmin ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    )
  ) : (
    <Navigate to="/login" />
  );
};
