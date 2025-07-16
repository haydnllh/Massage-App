import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { ItemIds, ItemNames, ItemPrices } from "../../config/itemIds";
import { setItemId } from "../../features/booking/bookingSlice";
import "./booking.scss";
import Popup from "../../components/Popup/Popup";
import { GoPlus } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [selectedItem, setSelectedBooking] = useState(1);
  const [popupPage, setPopupPage] = useState(1);
  const [items, setItems] = useState([]);
  const [selectedTimePrice, setSelectedTimePrice] = useState("");

  const reset = () => {
    setButtonPopup(false);
    setSelectedBooking(1);
    setPopupPage(1);
    setItems([]);
    setSelectedTimePrice("");
  };

  const handleClick = (item_id) => {
    //dispatch(setItemId(item_id));
    //user ? navigate("/bookings/availability") : navigate("/login");
    setButtonPopup(true);
    setSelectedBooking(item_id);
  };

  const handlePopupClick = (item_id) => {
    setSelectedBooking(item_id);
    setPopupPage(1);
    setSelectedTimePrice("");
  };

  const handleSelectChange = (e) => {
    setSelectedTimePrice(e.target.value);
  };

  const handleNextPage = () => {
    if (user) {
      navigate("/bookings/availability", { state: items });
    } else {
      navigate("/register", {
        state: {
          from: location.pathname,
          bookings: items,
        },
      });
    }
  };

  return (
    <div className="booking">
      <div className="main-image-container">
        <img src="back-massage.jpg" className="main"></img>
        <div className="main-image-text-container">Book Online</div>
      </div>

      <div className="booking-choices">
        <hr />
        <div className="choice">
          <div className="choice-description">
            <h3 className="title">Swedish Massage</h3>
            <p className="description">Description</p>
          </div>
          <button className="book-button" onClick={() => handleClick(1)}>
            Book Now
          </button>
        </div>
        <hr />
        <div className="choice">
          <div className="choice-description">
            <h3 className="title">Relaxing Massage</h3>
            <p className="description">Description</p>
          </div>
          <button className="book-button" onClick={() => handleClick(2)}>
            Book Now
          </button>
        </div>
        <hr />
        <div className="choice">
          <div className="choice-description">
            <h3 className="title">Reflexology Foot Massage</h3>
            <p className="description">Description</p>
          </div>
          <button className="book-button" onClick={() => handleClick(3)}>
            Book Now
          </button>
        </div>
        <hr />
        <div className="choice">
          <div className="choice-description">
            <h3 className="title">Head Massage</h3>
            <p className="description">Description</p>
          </div>
          <button className="book-button" onClick={() => handleClick(4)}>
            Book Now
          </button>
        </div>
        <hr />
        <div className="choice">
          <div className="choice-description">
            <h3 className="title">Back Neck Shoulders Head</h3>
            <p className="description">Description</p>
          </div>
          <button className="book-button" onClick={() => handleClick(5)}>
            Book Now
          </button>
        </div>
        <hr />
        <div className="choice">
          <div className="choice-description">
            <h3 className="title">Aromatherapy</h3>
            <p className="description">Description</p>
          </div>
          <button className="book-button" onClick={() => handleClick(6)}>
            Book Now
          </button>
        </div>
        <hr />
        <div className="choice">
          <div className="choice-description">
            <h3 className="title">Chinese Traditional Tuina</h3>
            <p className="description">Description</p>
          </div>
          <button className="book-button" onClick={() => handleClick(7)}>
            Book Now
          </button>
        </div>
        <hr />
        <div className="choice">
          <div className="choice-description">
            <h3 className="title">Sports Massage</h3>
            <p className="description">Description</p>
          </div>
          <button className="book-button" onClick={() => handleClick(8)}>
            Book Now
          </button>
        </div>
        <hr />
        <div className="choice">
          <div className="choice-description">
            <h3 className="title">Deep Tissue Massage</h3>
            <p className="description">Description</p>
          </div>
          <button className="book-button" onClick={() => handleClick(9)}>
            Book Now
          </button>
        </div>
        <hr />
        <div className="choice">
          <div className="choice-description">
            <h3 className="title">Thai Oil Massage</h3>
            <p className="description">Description</p>
          </div>
          <button className="book-button" onClick={() => handleClick(10)}>
            Book Now
          </button>
        </div>
        <hr />
        <div className="choice">
          <div className="choice-description">
            <h3 className="title">Cupping</h3>
            <p className="description">Description</p>
          </div>
          <button className="book-button" onClick={() => handleClick(11)}>
            Book Now
          </button>
        </div>
        <hr />
      </div>

      {popupPage === 1 ? (
        <Popup
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
          onClose={reset}
        >
          <h1>{ItemNames[selectedItem]}</h1>
          <hr className="title-line" />

          <h2>
            {selectedItem !== 11 &&
              `${ItemPrices[selectedItem][0].duration} min - ${
                ItemPrices[selectedItem].at(-1).duration
              } min`}
          </h2>
          <h2>
            {selectedItem === 11 &&
              `${ItemPrices[selectedItem][0].duration} min`}
          </h2>
          {selectedItem !== 11 && (
            <h3 id="price">{`From £${ItemPrices[selectedItem][0].price}`}</h3>
          )}
          {selectedItem === 11 && (
            <h3 id="price">{`£${ItemPrices[selectedItem][0].price} or £10 if used as any part of massage 
`}</h3>
          )}

          <p id="selector-label">Select your time</p>
          <select
            value={selectedTimePrice}
            id="time-selector"
            onChange={handleSelectChange}
          >
            <option key="" value="">
              Select an option
            </option>
            {ItemPrices[selectedItem].map(({ duration, price }, index) => (
              <option
                key={index}
                value={`${duration} min - £${price}`}
              >{`${duration} min - £${price}`}</option>
            ))}
          </select>

          <div className="popup-bottom">
            <hr className="next-button-line" />
            <button
              className="next-button"
              disabled={!selectedTimePrice.length}
              onClick={() => {
                setItems([
                  ...items,
                  {
                    item_id: selectedItem,
                    duration: parseInt(
                      selectedTimePrice.replace(/\s+|£|min/g, "").split("-")[0]
                    ),
                    price: parseInt(
                      selectedTimePrice.replace(/\s+|£|min/g, "").split("-")[1]
                    ),
                  },
                ]);
                setPopupPage(2);
                setButtonPopup(true);
              }}
            >
              Next
            </button>
          </div>
        </Popup>
      ) : popupPage === 2 ? (
        <Popup
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
          onClose={reset}
        >
          <h1>Appointment Summary</h1>
          <hr className="title-line" />
          <div id="above-button">
            <div className="scrollable">
              {items.map((i, index) => (
                <div key={index} className="chosen-item">
                  <h3>{ItemNames[i.item_id]}</h3>
                  <p>{`${i.duration} min`}</p>
                  <p>{`£${i.price}`}</p>
                </div>
              ))}
            </div>
            <button id="add-service" onClick={() => setPopupPage(3)}>
              Add Service
              <GoPlus />
            </button>
            <hr />
            <p>Total price: £{items.reduce((sum, i) => sum + i.price, 0)}</p>
          </div>
          <div className="popup-bottom" onClick={handleNextPage}>
            <hr className="next-button-line" />
            <button className="next-button">Next</button>
          </div>
        </Popup>
      ) : (
        <Popup
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
          onClose={reset}
        >
          <h1>Treatments</h1>
          <hr className="title-line" />
          <div className="popup-choice-list">
            {Object.entries(ItemPrices).map(([item_id, value], index) => (
              <div key={index}>
                <div
                  className="popup-choice"
                  key={item_id}
                  onClick={() => handlePopupClick(parseInt(item_id))}
                >
                  <div className="popup-choice-description">
                    <p>{`${ItemNames[item_id]} • ${value[0].duration} - ${
                      value.at(-1).duration
                    } min`}</p>
                    <p>{`From £${value[0].price}`}</p>
                  </div>
                  <button
                    className="pop-up-arrow-button"
                    onClick={() => handlePopupClick(parseInt(item_id))}
                  >
                    <MdKeyboardArrowRight />
                  </button>
                </div>
                <hr />
              </div>
            ))}
          </div>
          <button className="back-button" onClick={() => setPopupPage(2)}>
            Back
          </button>
        </Popup>
      )}
    </div>
  );
};

export default Booking;
