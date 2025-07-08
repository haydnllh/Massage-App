import { useState, useEffect } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import { fetchAllBookings } from "../../api/bookings";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ItemNames } from "../../config/itemIds";
import "./calendar.scss"

const localizer = dayjsLocalizer(dayjs);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("week")
 
  useEffect(() => {
    const loadBookings = async () => {
      const events = await fetchAllBookings();
      const mapped = events.map(
        (
          {
            booking_date,
            email,
            first_name,
            last_name,
            item_id,
            start_time,
            end_time,
          },
          index
        ) => ({
            title: `${ItemNames[item_id]} 
          ${first_name} ${last_name}`,
          start: new Date(booking_date.split("T")[0] + "T" + start_time),
          end: new Date(booking_date.split("T")[0] + "T" + end_time),
        })
      );

      setEvents(mapped);
    };

    loadBookings();
  }, []);

  return (
    <div style={{ height: 600 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        defaultView="week"
        views={["month", "week", "day"]}
        step={30}
        timeslots={2}
        style={{ height: "100%" }}
        date={date}
        onNavigate={(newDate) => setDate(newDate)}
        view={view}
        onView={setView}
      />
    </div>
  );
};

export default MyCalendar;