import { Calendar } from "react-big-calendar";
import CalendarEvent from "./CalendarEvent";
import React from "react";

const MemoCalendar = React.memo(({ localizer, events, date, onNavigate, view, onView }) => {
  return (
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
      onNavigate={onNavigate}
      view={view}
      onView={onView}
      components={{ event: CalendarEvent }}
      min={new Date(0, 0, 0, 9, 0, 0)}
    />
  );
});

export default MemoCalendar;
