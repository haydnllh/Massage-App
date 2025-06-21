import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Confirmation = () => {
    const {booking} = useSelector(state => state.booking)
    const dispatch = useDispatch();

    const date = booking.booking_date.split("T")[0]

    return (
        <>
            <h1 className="heading center">Confirmation</h1>
            <div>
                <h2>Date: {date}</h2>
                <h2>Start Time: {booking.start_time}</h2>
                <h2>End Time: {booking.end_time}</h2>
            </div>
        </>
    )
}

export default Confirmation;