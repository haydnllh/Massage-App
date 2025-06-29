import { useNavigate } from "react-router-dom";
import "./home.scss";
import Footer from "../../components/Footer/Footer"

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="main-image-container">
        <img src="chinese-medicine-3666269_1280.jpg" className="main"></img>
        <div className="main-image-text-container">
          <button
            className="main-image-button"
            onClick={() => {
              navigate("/bookings");
            }}
          >
            Book Now
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
