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

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/bookings" element={<Booking />}></Route>
        <Route path="/bookings/availability" element={<Availability />} />
        <Route path="/bookings/confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  );
};

export default App;
