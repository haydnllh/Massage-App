import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { ItemPrices, ItemNames } from "../../config/itemIds";
import "./availability.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  generateTimeFromRange,
  generateClosingTimes,
  getUKMidnightToday,
  addMinutes,
} from "../../config/time";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getBookingOnDate, postBooking } from "../../api/bookings";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
let today = getUKMidnightToday();

const Availability = () => {
  const navigate = useNavigate();
  const items = useLocation().state;
  const { user } = useSelector((state) => state.auth);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    if (today.getDay() === 2) {
      today = new Date(today.getTime() + 86400000);
    }
    setSelectedDate(today);
  }, []);

  const {
    status: getStatus,
    error: getError,
    data,
  } = useQuery({
    queryKey: ["booking", selectedDate],
    queryFn: () => getBookingOnDate(selectedDate),
  });

  const {
    status: postStatus,
    error: postError,
    mutate,
  } = useMutation({
    mutationFn: (bookings) => postBooking(bookings, user.user_id),
    onSuccess: (data) => {
      navigate("/bookings/confirmation", { state: data });
    },
  });

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time");
      return;
    }

    //format with dayjs
    var time = selectedTime;
    var itemsToSubmit = [];
    for (var i = 0; i < items.length; i++) {
      const { duration, price, item_id } = items[i];
      var end_time = addMinutes(time, parseInt(duration));

      itemsToSubmit.push({
        item_id: item_id,
        booking_date: dayjs(selectedDate).format("YYYY-MM-DD"),
        start_time: dayjs(time).format("HH:mm:ss"),
        end_time: dayjs(end_time).format("HH:mm:ss"),
      });

      time = end_time;
    }

    const dataToSubmit = {
      bookingsList: itemsToSubmit,
    };

    mutate(dataToSubmit);
  };

  const dateFilter = (date) => {
    return date.getDay() !== 2 && date >= today;
  };

  const getDisabledTimes = () => {
    if (!selectedDate) return [];

    var disabledTimes = [];

    const totalDuration = items.reduce((acc, i) => {
      return (acc += i.duration);
    }, 0);

    data.forEach((booking) => {
      disabledTimes = disabledTimes.concat(
        generateTimeFromRange(
          booking.booking_date,
          booking.start_time.split(":")[0],
          booking.start_time.split(":")[1],
          booking.end_time.split(":")[0],
          booking.end_time.split(":")[1],
          totalDuration
        )
      );
    });

    disabledTimes = disabledTimes.concat(
      generateClosingTimes(selectedDate, totalDuration)
    );

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
              onChange={(date) => {
                setSelectedDate(date);
                setSelectedTime(null);
              }}
              inline
              id="datepicker"
              filterDate={dateFilter}
            />
          </div>

          {(() => {
            switch (getStatus) {
              case "pending":
                return <img className="loading" src="/Loading.svg" alt="Loading..." />;
              case "success":
                return (
                  <div className="timepicker">
                    <DatePicker
                      selected={selectedTime}
                      onChange={(time) => setSelectedTime(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      dateFormat="hh:mm aa"
                      inline
                      timeCaption="Available times"
                      excludeTimes={getDisabledTimes()}
                    />
                  </div>
                );
                break;
              case "error":
                return <h2>Error fetching times</h2>;
                break;
            }
          })()}
        </div>
      </div>

      <div className="availability-right">
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
        <button className="next-button" onClick={handleSubmit}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Availability;
