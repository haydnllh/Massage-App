import "./home.scss";

const Home = () => {
  return (
    <div className="container">
      <div className="image-container">
        <img
          src="massage-1929064_1920.jpg"
          className="home-image reception"
        />
        <div>
          <img src="front.jpg" alt="Shop front" className="home-image" />
          <img src="bed.jpg" alt="Bed" className="home-image" />
        </div>
      </div>
    </div>
  );
};

export default Home;
