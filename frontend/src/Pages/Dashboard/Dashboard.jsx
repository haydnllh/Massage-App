import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllBookings } from "../../api/bookings";
import BookingList from "../../components/BookingList/BookingList";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const result = await fetchAllBookings();
        setBookings(result);
      } catch (err) {
        console.log(err);
      }
    };

    loadBookings();
  }, []);

  return (
    <div>
      <h1 className="heading center">Dashboard</h1>
      <BookingList data={bookings}/>
    </div>
  );
};

export default Dashboard;
