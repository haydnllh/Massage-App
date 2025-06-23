import { ItemNames } from "../../config/itemIds";
import "./bookingList.styles.scss"

const BookingList = ({ data }) => {
  return (
    <div className="container">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Item</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.first_name + " " + item.last_name}</td>
                <td>{item.email}</td>
                <td>{ItemNames[item.item_id]}</td>
                <td>{item.booking_date.split("T")[0]}</td>
                <td>{item.start_time + " - " + item.end_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;
