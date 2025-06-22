import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ItemIds } from "../../config/itemIds";

const Booking = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleClick = (item_id) =>
    user
      ? navigate("/bookings/availability", { state: item_id })
      : navigate("/login");

  return (
    <div className="container booking">
      <div className="bookingVbox">
        <img
          src="tuina.jpg"
          className="bookingImage"
          onClick={() => handleClick(ItemIds.TUINA)}
          alt="Tuina"
        />
        <button className="bookButton" onClick={() => handleClick(ItemIds.TUINA)}>
          Book now
        </button>
      </div>
      <div className="bookingVbox">
        <img
          src="cupling.jpg"
          className="bookingImage"
          onClick={() => handleClick(ItemIds.CUPPLING)}
          alt="Cuppling"
        />
        <button className="bookButton" onClick={() => handleClick(ItemIds.CUPPLING)}>
          Book now
        </button>
      </div>
    </div>
  );
};

export default Booking;
