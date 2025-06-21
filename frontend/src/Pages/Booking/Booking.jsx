import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleClick = () => user ? navigate("/bookings/availability") : navigate("/login")

  return (
    <div className="container">
      <button className="submit" onClick={handleClick}>Book</button>
    </div>
  );
};

export default Booking;
