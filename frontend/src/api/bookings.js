export async function fetchAllBookings() {
  const result = await fetch("/api/bookings/bookinglist", {
    method: "GET",
  });

  if(!result.ok){
    throw new Error(result.json())
  }

  const data = await result.json()
  return data
}
