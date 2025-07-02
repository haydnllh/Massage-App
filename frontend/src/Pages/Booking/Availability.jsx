import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { ItemPrices, ItemNames } from "../../config/itemIds";
import "./availability.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { generateTimeFromRange, generateClosingTimes } from "../../config/time";

const Availability = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useLocation().state;
  const { user } = useSelector((state) => state.auth);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  const isDateDisabled = (date) => {
    return disabledDatesJs.some((day) => day.isSame(date));
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time");
      return;
    }

    const combined = selectedDate
      .hour(selectedTime.hour())
      .minute(selectedTime.minute());

    const user_id = user.user_id;
    const bookings = items.map((i) => ({
      item_id: i.item_id,
      booking_date: combined.format("YYYY-MM-DD"),
      start_time: combined.format("HH:mm"),
      end_time: combined.add(i.duration, "minute").format("hh:mm"),
    }));

    const dataToSubmit = {
      user_id,
      bookings,
    };

    console.log(dataToSubmit);
  };

  const dateFilter = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date.getDay !== 2 && date >= today;
  };

  const getDisabledTimes = () => {
    if (!selectedDate) return [];

    var disabledTimes = [];

    const closedTimes = generateTimeFromRange(selectedDate, 0, 0, 8, 0);
    disabledTimes = disabledTimes.concat(generateClosingTimes(selectedDate));

    return disabledTimes;
  };

  return (
    <div className="container availability-container">
      <div className="availability-left">
        <p className="title">Select your date and time</p>
        <hr />

        <div id="datepicking">
          <div className="datepicker">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              inline
              id="datepicker"
              filterDate={dateFilter}
            />
          </div>

          <div className="timepicker">
            <DatePicker
              selected={selectedTime}
              onChange={(time) => setSelectedTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="h:mm aa"
              inline
              timeCaption="Available times"
              excludeTimes={getDisabledTimes()}
            />
          </div>
        </div>
      </div>

      <div id="summary">
        <h2>Your Appointment</h2>
        <hr id="summary-line" />
        {items.map((i, index) => (
          <div className="summary-item" key={index}>
            <p>{ItemNames[i.item_id]}</p>
            <p>{`${i.duration} min`}</p>
            <hr className="summary-item-line" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Availability;
