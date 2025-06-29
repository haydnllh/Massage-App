import "./Footer.scss";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="contact">
        <h2>Contacts</h2>
        <div className="phone icon">
          <FaPhone />
          <p>
            <a href="tel:+447476338831">+44 7476 338831</a>
          </p>
        </div>
        <div className="email icon">
          <MdEmail />
          <p>
            <a href="mailto:77stationR@willowwellnesssportstherapy.com">
              77stationR@willowwellnesssportstherapy.com
            </a>
          </p>
        </div>
        <div className="location icon">
          <FaLocationDot />
          <p>
            <a
              href="https://www.google.com/maps/place/willow+wellness+%26+sport+therapy/@52.3426722,-1.5786583,17z/data=!3m1!4b1!4m6!3m5!1s0x4870cb7bb097127f:0xff63fe4dc885276d!8m2!3d52.3426722!4d-1.5786583!16s%2Fg%2F11k9dyxxwg?entry=ttu&g_ep=EgoyMDI1MDYyMy4yIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              77 Station Rd, Kenilworth, CV8 1JD
            </a>
          </p>
        </div>
      </div>
      <div className="contact">
        <h2>Opening Hours</h2>
        <div className="opening-hours icon">
          <p>
            Monday: 10:00 - 19:30 <br/>
            Tuesday: Closed <br />
            Wednesday: 10:00 - 19:30 <br />
            Thursday: 10:00 - 19:30 <br />
            Friday: 10:00 - 19:30 <br />
            Saturaday: 11:00 - 18:00 <br />
            Sunday: 11:00 - 18:00
          </p>
        </div>
      </div>
    </footer>
  );
}
