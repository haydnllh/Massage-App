import dayjs from "dayjs";
import "./calendarEvent.scss";

const CalendarEvent = ({ event }) => {
  return (
    <div className="event-container">
      <div className="title">
        {event.description !== "" ? event.description : event.name} <br />{" "}
        {event.item}{" "}
      </div>
      <div className="time">
        {dayjs(event.start).format("HH:mm")} –{" "}
        {dayjs(event.end).format("HH:mm")}
      </div>
    </div>
  );
};

export default CalendarEvent;
