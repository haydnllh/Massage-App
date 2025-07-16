import { ItemNames } from "../../config/itemIds";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import "./bookingList.styles.scss";

const BookingList = ({ data }) => {
  return (
    <div className="container">
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
            {data.map((item, index) => (
              <tr key={index}>
                <td className="item-field">{item.item}</td>
                <td className="date-field">{item.booking_date.split("T")[0]}</td>
                <td className="time-field">
                  {item.start_time + " - " + item.end_time}
                  <div className="buttons">
                    <button className="list-button">
                      <CiEdit />{" "}
                    </button>
                    <button className="list-button">
                      <MdDeleteOutline />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;
