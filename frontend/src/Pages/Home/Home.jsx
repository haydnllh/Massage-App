import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./home.scss";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "bisque";

    return () => {
      document.body.style.backgroundColor = "#f9f2ea";
    };
  }, []);

  return (
    <div className="home">
      <div className="image-background">
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
      </div>

      <div className="services">
        <div className="services-title">
          <h1>Our services</h1>
        </div>
        <img src="line-separator.png" className="line-separator" />
        <div className="service-list">
          <div className="service">
            <img
              className="service-image"
              src="chinese-medicine-3666269_1280.jpg"
            />
            asdalfkhabfhaisfhdasoifhaoishfaosifhasoidfhasfhui
          </div>
          <div className="service"></div>
          <div className="service"></div>
          <div className="service"></div>
          <div className="service"></div>
          <div className="service"></div>
          <div className="service"></div>
          <div className="service"></div>
          <div className="service"></div>
          <div className="service"></div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
