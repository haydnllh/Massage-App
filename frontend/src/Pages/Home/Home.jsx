import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./home.scss";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const servicesRef = useRef();

  useEffect(() => {
    document.body.style.backgroundColor = "bisque";
    setTimeout(() => {
      if (location.hash === "#services") {
        servicesRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);

    return () => {
      document.body.style.backgroundColor = "#f9f2ea";
    };
  }, [location]);

  return (
    <div className="home">
      <div className="main-image-container">
        <img src="chinese-style-774902_1920.jpg" className="main" />
        <div className="white-overlay">
          <div className="subimages">
            <div className="subimage-container landscape">
              <img
                src="camille-brodard-VxAwTeiqDao-unsplash.jpg"
                className="sub"
              />
            </div>
            <div className="subimage-container protrait">
              <img
                src="massage-a-domicile-nMVUTY8_gGw-unsplash.jpg"
                className="sub"
              />
            </div>
          </div>
          <div className="main-image-text-container">
            <h2 className="title">
              Revitalise Your Life Embrace the Healing Power of Traditional
              Chinese Therapy!
            </h2>
            <p className="content">
              Welcome to Willow Wellness and Sport Therapy <br />
              Trusted professionals offering rejuvenating Chinese massage —
              where healing meets harmony.
            </p>
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
        <div className="custom-shape-divider-top-1752745054">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>

      <div className="services" ref={servicesRef}>
        <div className="services-title">
          <h1>Our services</h1>
        </div>
        <img src="line-separator.png" className="line-separator" />
        <div className="service-list">
          <div className="service">
            <img
              className="service-image"
              src="chinese-medicine-3666269_1280.jpg"
              alt="Swedish Massage"
            />
            <div className="service-text">
              <h3>Swedish Massage</h3>
              <p>
                A classic full-body massage that uses smooth, flowing strokes to
                relax muscles, boost circulation, and relieve everyday stress.
                Ideal for those seeking gentle, calming relief and total body
                relaxation.
              </p>
              <button
                className="book-button"
                onClick={() => navigate("./bookings", { state: 1 })}
              >
                Book Online
              </button>
            </div>
          </div>
          <div className="service">
            <img
              className="service-image"
              src="benjamin-wedemeyer-1rdB14ttWgQ-unsplash.jpg"
              alt="Relaxing Massage"
            />
            <div className="service-text">
              <h3>Relaxing Massage</h3>
              <p>
                A soothing, slow-paced full-body massage designed to calm your
                nervous system, ease tension, and help you fully unwind. Perfect
                for stress relief and deep mental relaxation.
              </p>
              <button
                className="book-button"
                onClick={() => navigate("./bookings", { state: 2 })}
              >
                Book Online
              </button>
            </div>
          </div>
          <div className="service">
            <img
              className="service-image"
              src="physical-therapy-2133286_1920.jpg"
              alt="Reflexology Foot Massage"
            />
            <div className="service-text">
              <h3>Reflexology Foot Massage</h3>
              <p>
                A therapeutic foot massage that applies gentle pressure to key
                points, stimulating your body’s natural healing and promoting
                overall balance and relaxation.
              </p>
              <button
                className="book-button"
                onClick={() => navigate("./bookings", { state: 3 })}
              >
                Book Online
              </button>
            </div>
          </div>
          <div className="service">
            <img
              className="service-image"
              src="head-massage-3530560_1920.jpg"
              alt="Head Massage"
            />
            <div className="service-text">
              <h3>Head Massage</h3>
              <p>
                A calming treatment that relieves tension in the scalp, neck,
                and shoulders—helping reduce stress, ease headaches, and leave
                you feeling refreshed and clear-headed.
              </p>
              <button
                className="book-button"
                onClick={() => navigate("./bookings", { state: 4 })}
              >
                Book Online
              </button>
            </div>
          </div>
          <div className="service">
            <img
              className="service-image"
              src="woman-2722936_1920.jpg"
              alt="Back Neck Shoulders Head"
            />
            <div className="service-text">
              <h3>Back Neck Shoulders Head</h3>
              <p>
                A targeted massage that releases deep tension in your upper
                body—perfect for relieving tight muscles, reducing headaches,
                and melting away stress from everyday life.
              </p>
              <button
                className="book-button"
                onClick={() => navigate("./bookings", { state: 5 })}
              >
                Book Online
              </button>
            </div>
          </div>
          <div className="service">
            <img
              className="service-image"
              src="glass-4108085_1920.jpg"
              alt="Aromatherapy"
            />
            <div className="service-text">
              <h3>Aromatherapy</h3>
              <p>
                A gentle full-body massage enhanced with essential oils chosen
                to relax, uplift, or energize. Combines soothing touch with
                therapeutic scents to calm the mind, ease tension, and restore
                balance.
              </p>
              <button
                className="book-button"
                onClick={() => navigate("./bookings", { state: 6 })}
              >
                Book Online
              </button>
            </div>
          </div>
          <div className="service">
            <img
              className="service-image"
              src="young-woman-receiving-back-massage-spa-center.jpg"
              alt="Chinese Traditional Tuina"
            />
            <div className="service-text">
              <h3>Chinese Traditional Tuina</h3>
              <p>
                A traditional Chinese therapeutic massage that uses acupressure,
                stretching, and rhythmic techniques to unblock energy flow,
                relieve pain, and restore balance throughout the body.
              </p>
              <button
                className="book-button"
                onClick={() => navigate("./bookings", { state: 7 })}
              >
                Book Online
              </button>
            </div>
          </div>
          <div className="service">
            <img
              className="service-image"
              src="Sports-massage1.jpg"
              alt="Sports Massage"
            />
            <div className="service-text">
              <h3>Sports Massage</h3>
              <p>
                A deep, focused massage designed to support active
                lifestyles—relieving muscle tension, improving flexibility, and
                speeding up recovery before or after physical activity.
              </p>
              <button
                className="book-button"
                onClick={() => navigate("./bookings", { state: 8 })}
              >
                Book Online
              </button>
            </div>
          </div>
          <div className="service">
            <img
              className="service-image"
              src="deep-tissue.jpeg"
              alt="Deep Tissue Massage"
            />
            <div className="service-text">
              <h3>Deep Tissue Massage</h3>
              <p>
                An intense massage targeting deeper layers of muscles and
                connective tissue to relieve chronic tension, improve mobility,
                and reduce pain.
              </p>
              <button
                className="book-button"
                onClick={() => navigate("./bookings", { state: 9 })}
              >
                Book Online
              </button>
            </div>
          </div>
          <div className="service">
            <img
              className="service-image"
              src="masseuse-applying-oil-back+(1).jpg"
              alt="Thai Oil Massage"
            />
            <div className="service-text">
              <h3>Thai Oil Massage</h3>
              <p>
                A harmonious blend of traditional Thai techniques with the
                smooth glide of warm oils, designed to relax muscles, improve
                circulation, and restore energy flow.
              </p>
              <button
                className="book-button"
                onClick={() => navigate("./bookings", { state: 10 })}
              >
                Book Online
              </button>
            </div>
          </div>
        </div>
        <svg
          className="inward-curve"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
        >
          <path d="M0,10 Q50,5 100,10 Z" fill="#f9f2ea" />
        </svg>
      </div>

      <div className="about-us">
        <h1>About Us</h1>
        <p>
          Willow therapist Yan is trained in many forms of traditional Chinese
          Medicine Therapy and professional massage courses. My vast knowledge
          on the human body structure will help you customize your session
          depending on your needs and requirements.
          <br />I have been working in London and Birmingham for about 6 years
          and in therapeutic massage and cosmetology for over 12 years in China.
          Now I have moved to a new location in Kenilworth. My new premises will
          allow us to offer a more focused therapy in a more relaxed setting and
          surroundings.
        </p>
      </div>

      <div className="testimonials">
        <img src="books-8067850_1920.jpg" className="testimonial-photo" />
        <div className="white-overlay">
          <script
            src="https://static.elfsight.com/platform/platform.js"
            async
          ></script>
          <div
            className="elfsight-app-3b689ff8-afe3-4bbb-8602-9a232d90cf4a"
            data-elfsight-app-lazy
          ></div>
        </div>
      </div>

      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2437.5298131476034!2d-1.5812332241408318!3d52.34267544934405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870cb7bb097127f%3A0xff63fe4dc885276d!2swillow%20wellness%20%26%20sport%20therapy!5e0!3m2!1sen!2suk!4v1752838407392!5m2!1sen!2suk"
          width="90%"
          height="450"
          loading="lazy"
          style={{ border: "0" }}
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
