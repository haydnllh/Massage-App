import { useLocation } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation();
  const bookings = location.state;
  console.log(bookings)

  return (
    <div className="container">
      <h1 className="heading center">Confirmation</h1>
      <div>
        {bookings.map((booking, index) => (
          <div key={index}>
            {JSON.stringify(booking)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Confirmation;
