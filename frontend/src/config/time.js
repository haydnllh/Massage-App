import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function generateTimeFromRange(
  date,
  startHour,
  startMin,
  endHour,
  endMin
) {
  const disabledTimes = [];

  var time = new Date(date);
  time.setHours(parseInt(startHour), parseInt(startMin), 0);

  const endTime = new Date(date);
  endTime.setHours(parseInt(endHour), parseInt(endMin), 0);

  while (time < endTime) {
    disabledTimes.push(time);
    time = new Date(time.getTime() + 15 * 60000);
  }

  return disabledTimes;
}

export function generateClosingTimes(date) {
  const day = date.toLocaleDateString("en-UK", {weekday: "long"})
  var disabled = [];

  switch (day) {
    case "Sunday":
    case "Saturday":
      disabled = disabled.concat(generateTimeFromRange(date, 0, 0, 11, 0));
      disabled = disabled.concat(generateTimeFromRange(date, 18, 0, 24, 0));
      break;
    case "Monday":
    case "Wednesday":
    case "Thursday":
    case "Friday":
      disabled = disabled.concat(generateTimeFromRange(date, 0, 0, 10, 0));
      disabled = disabled.concat(generateTimeFromRange(date, 19, 30, 24, 0));
      break;
    default:
      return [];
  }

  return disabled;
}

export function getUKMidnightToday() {
  const ukTodayMidnight = dayjs().tz("Europe/London").startOf("day");
  return ukTodayMidnight.toDate();
}

export function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}
