import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { createBooking } from "../../features/booking/bookingSlice";
import { ItemPrices } from "../../config/itemIds";

const disabledDates = ["2025-06-19"];

const disabledDatesJs = disabledDates.map((date) => dayjs(date));

const Availability = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, item_id: storedItemId } = useSelector(
    (state) => state.booking
  );
  const item_id = storedItemId || localStorage.getItem("item_id");
  const { user } = useSelector((state) => state.auth);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const isDateDisabled = (date) => {
    return disabledDatesJs.some((day) => day.isSame(date));
  };

  useEffect(() => {
    if (isSuccess) navigate("/bookings/confirmation");
  }, [isSuccess]);

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time");
      return;
    }

    const combined = selectedDate
      .hour(selectedTime.hour())
      .minute(selectedTime.minute());

    const user_id = user.user_id;
    const booking = {
      item_id: item_id,
      booking_date: combined.format("YYYY-MM-DD"),
      start_time: combined.format("HH:mm"),
      end_time: combined.add(2, "hour").format("hh:mm"),
    };

    const dataToSubmit = {
      user_id,
      booking,
    };

    localStorage.removeItem("item_id");

    dispatch(createBooking(dataToSubmit));
  };

  return (
    <div className="container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Choose a date"
          onChange={(newDate) => setSelectedDate(newDate)}
          shouldDisableDate={isDateDisabled}
        />

        <TimePicker
          label="Choose a time"
          onChange={(newTime) => setSelectedTime(newTime)}
          disabled={!selectedDate}
          timezone="default"
          ampm={false}
        />
      </LocalizationProvider>

      <select>
        {ItemPrices[item_id].map(({ duration, index }) => (
          <option key={index}>{duration}</option>
        ))}
      </select>
      <button className="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Availability;
