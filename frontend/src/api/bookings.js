import dayjs from "dayjs";

export async function fetchAllBookings() {
  const result = await fetch("/api/bookings/bookinglist", {
    method: "GET",
  });

  if (!result.ok) {
    throw new Error(result.json());
  }

  const data = await result.json();
  return data;
}

export async function getBookingOnDate(selectedDate) {
  const parsed = dayjs(selectedDate);

  if (!parsed.isValid()) throw new Error("Invalid date");

  const date = parsed.format("YYYY-MM-DD");

  const res = await fetch(`/api/bookings/bookinglist/date?date=${date}`);

  if (!res.ok) {
    throw new Error("Failed to get booking times");
  }

  return res.json();
}

export async function postBooking(bookings, user_id) {
  const res = await fetch(`/api/bookings/${user_id}`, {
    method: "POST",
    body: JSON.stringify(bookings),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to post booking");
  }

  return res.json();
}

export async function getBookingByUser(user_id) {
  const res = await fetch(`/api/bookings/${user_id}`);

  if (!res.ok) {
    throw new Error("Failed to get user's bookings");
  }

  return res.json();
}

export async function deleteBooking(booking_id, user_id) {
  const res = await fetch(`/api/bookings/${user_id}`, {
    method: "DELETE",
    body: JSON.stringify({ booking_ids: [booking_id] }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete booking");
  }

  return res.json();
}
