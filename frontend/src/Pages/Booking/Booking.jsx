import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ItemIds } from "../../config/itemIds";
import { setItemId } from "../../features/booking/bookingSlice";
import "./booking.styles.scss"

const Booking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleClick = (item_id) => {
    dispatch(setItemId(item_id))
    user
      ? navigate("/bookings/availability")
      : navigate("/login");
  }

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
