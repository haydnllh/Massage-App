import "./app.styles.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import Booking from "./Pages/Booking/Booking";
import Availability from "./Pages/Booking/Availability";
import Confirmation from "./Pages/Booking/Confirmation";
import Profile from "./Pages/Account/Profile";
import Bookings from "./Pages/Account/Bookings";
import Account from "./Pages/Account/Account";

import {
  UserProtectedRoutes,
  AdminProtectedRoutes,
} from "./config/ProtectedRoutes";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="page-content">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/bookings" element={<Booking />} />
          <Route element={<UserProtectedRoutes />}>
            <Route path="/bookings/availability" element={<Availability />} />
            <Route path="/bookings/confirmation" element={<Confirmation />} />
            <Route path="/account" element={<Account />}>
              <Route path="profile" element={<Profile />} />
              <Route path="bookings" element={<Bookings />} />
            </Route>
          </Route>
          <Route element={<AdminProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
