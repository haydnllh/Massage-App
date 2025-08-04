import { useState, useEffect, useMemo, useCallback } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import { fetchAllBookings } from "../../api/bookings";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ItemNames } from "../../config/itemIds";
import "./calendar.scss";
import Popup from "../Popup/Popup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useMutation } from "@tanstack/react-query";
import { postBooking } from "../../api/bookings";
import { useSelector } from "react-redux";
import { formErrors } from "../../config/formErrors";
import MemoCalendar from "./MemoCalendar";

const localizer = dayjsLocalizer(dayjs);

const MyCalendar = () => {
  const { user } = useSelector((state) => state.auth);

  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("week");
  const [buttonPopup, setButtonPopup] = useState(false);
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventStarting, setNewEventStarting] = useState(null);
  const [newEventEnding, setNewEventEnding] = useState(null);
  const [newEventItem, setNewEventItem] = useState(1);
  const [error, setError] = useState(null);

  const handleNavigate = useCallback((newDate) => setDate(newDate), []);
  const handleView = useCallback((newView) => setView(newView), []);

  const reset = () => {
    setNewEventDescription("");
    setNewEventStarting(null);
    setNewEventEnding(null);
    setNewEventItem(1);
  };

  useEffect(() => {
    const loadBookings = async () => {
      const events = await fetchAllBookings();
      const mapped = events.map(
        ({
          booking_date,
          first_name,
          last_name,
          item_id,
          start_time,
          end_time,
          description,
        }) => ({
          item: ItemNames[item_id],
          name: `${first_name} ${last_name}`,
          start: new Date(booking_date.split("T")[0] + "T" + start_time),
          end: new Date(booking_date.split("T")[0] + "T" + end_time),
          description: description,
        })
      );

      setEvents(mapped);
    };

    loadBookings();
  }, []);

  const {
    status: postStatus,
    error: postError,
    mutate,
  } = useMutation({
    mutationFn: (bookings) => postBooking(bookings, user.user_id),
    onSuccess: () => {
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          item: ItemNames[newEventItem],
          start: newEventStarting,
          end: newEventEnding,
          description: newEventDescription,
        },
      ]);
      setButtonPopup(false);
      reset();
    },
  });

  const handleAdd = () => {
    if (
      newEventItem &&
      newEventStarting &&
      newEventEnding &&
      newEventDescription
    ) {
      const eventToSubmit = {
        item_id: newEventItem,
        booking_date: dayjs(newEventStarting).format("YYYY-MM-DD"),
        start_time: dayjs(newEventStarting).format("HH:mm:ss"),
        end_time: dayjs(newEventEnding).format("HH:mm:ss"),
        description: newEventDescription,
      };

      mutate({ bookingsList: [eventToSubmit] });
    } else {
      setError(formErrors.EMPTY_FIELD);
    }
  };

  return (
    <div style={{ height: 3000, marginTop: 25 }}>
      <button onClick={() => setButtonPopup(true)}>Add new event</button>
      <MemoCalendar
        localizer={localizer}
        events={events}
        date={date}
        onNavigate={handleNavigate}
        view={view}
        onView={handleView}
      />

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup} onClose={reset}>
        <h1>Add New Event</h1>
        <hr />
        <div>
          Description:{" "}
          <input
            value={newEventDescription}
            onChange={(e) => setNewEventDescription(e.target.value)}
          />
        </div>
        <div>
          Starting Time:{" "}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Select Date & Time"
              value={newEventStarting}
              onChange={(e) => {
                setNewEventStarting(e);
                setNewEventEnding(e);
              }}
              ampm={true}
            />
          </LocalizationProvider>
        </div>
        <div>
          Ending Time:{" "}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Select Date & Time"
              value={newEventEnding}
              onChange={setNewEventEnding}
              ampm={true}
              disabled={!newEventStarting}
            />
          </LocalizationProvider>
        </div>
        <div>
          Service:{" "}
          <select
            value={newEventItem}
            onChange={(e) => setNewEventItem(e.target.value)}
          >
            {Object.entries(ItemNames).map(([key, value], index) => (
              <option value={key} key={index}>
                {value}
              </option>
            ))}
          </select>
        </div>
        {error === formErrors.EMPTY_FIELD && <p>Please fill in all fields</p>}
        <button onClick={handleAdd}>Add</button>
      </Popup>
    </div>
  );
};

export default MyCalendar;
