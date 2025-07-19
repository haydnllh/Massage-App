import { useQuery, useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getBookingByUser } from "../../api/bookings";
import { ItemNames, ItemPrices, ItemIdFromString } from "../../config/itemIds";
import "./booking.scss";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { deleteBooking } from "../../api/bookings";
import Popup from "../../components/Popup/Popup";
import { IoWarningOutline } from "react-icons/io5";

const Bookings = () => {
  const { user } = useSelector((state) => state.auth);
  const [rows, setRows] = useState([]);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const {
    status: getStatus,
    error: getError,
    data,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => getBookingByUser(user.user_id),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const {
    status: deleteStatus,
    error: deleteError,
    mutate,
  } = useMutation({
    mutationFn: (booking_id) => deleteBooking(booking_id, user.user_id),
    onSuccess: (data) => {
      setRows((prevRows) =>
        prevRows.filter((item) => {
          return item.id !== data[0].booking_id;
        })
      );
      setDeletePopup(false);
    },
  });

  useEffect(() => {
    if (getStatus === "success") {
      const dataRows =
        data &&
        data.map((b) => ({
          id: b.booking_id,
          item: ItemNames[b.item_id],
          booking_date: b.booking_date,
          start_time: `${b.start_time.split(":")[0]}:${
            b.start_time.split(":")[1]
          }`,
          end_time: `${b.end_time.split(":")[0]}:${b.end_time.split(":")[1]}`,
        }));
      setRows(dataRows);
    }
  }, [getStatus]);

  const BookingList = () => (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((item, index) => (
            <tr key={index}>
              <td className="item-field">{item.item}</td>
              <td className="date-field">{item.booking_date.split("T")[0]}</td>
              <td className="time-field">
                {item.start_time + " - " + item.end_time}
                <div className="buttons">
                  <button
                    className="delete-button"
                    onClick={() => {
                      setDeletePopup(true);
                      setSelectedBookingId(item.id);
                    }}
                  >
                    <MdDeleteOutline className="delete-icon" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="account-bookings-container">
      <div className="title">
        <h1>Your Bookings</h1>
        <p>
          <small>Information of your bookings</small>
        </p>
        {getStatus === "pending" && <img className="loading" src="/Loading.svg" alt="Loading..." />}
      </div>
      {getStatus === "success" && <BookingList />}
      <Popup trigger={deletePopup} setTrigger={setDeletePopup}>
        <h2 className="popup-title">
          <IoWarningOutline className="warning" />
          Delete Confirmation
        </h2>
        <hr />
        <p>Are you sure you want to delete this booking?</p>
        <hr />
        <div className="delete-buttons">
          <button className="cancel" onClick={() => setDeletePopup(false)}>
            Cancel
          </button>
          <button
            className="delete"
            onClick={() => {
              mutate(selectedBookingId);
            }}
          >
            Delete
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default Bookings;
