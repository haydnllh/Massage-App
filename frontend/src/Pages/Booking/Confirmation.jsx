import { useSelector, useDispatch } from "react-redux";
import { ItemNames } from "../../config/itemIds";
import { useEffect, useRef } from "react";
import { reset } from "../../features/booking/bookingSlice";

const Confirmation = () => {
  const { booking } = useSelector((state) => state.booking);
  let cleanUp = 0;
  const dispatch = useDispatch();

  const date = booking.booking_date.split("T")[0];

  useEffect(() => {
    cleanUp++;
    return () => {
      //change later when not strict mode
      if (cleanUp === 2) {
        dispatch(reset());
      }
    };
  }, []);

  return (
    <div className="container">
      <h1 className="heading center">Confirmation</h1>
      <div>
        <h2>Date: {date}</h2>
        <h2>Start Time: {booking.start_time}</h2>
        <h2>End Time: {booking.end_time}</h2>
        <h2>Treatment Type: {ItemNames[booking.item_id]}</h2>
      </div>
    </div>
  );
};

export default Confirmation;
