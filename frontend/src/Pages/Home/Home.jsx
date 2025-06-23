import "./home.scss";

const Home = () => {
  return (
    <div className="container">
      <div className="image-container">
        <h1 className="heading center">Home</h1>
        <img
          src="reception.jpg"
          alt="Reception"
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
