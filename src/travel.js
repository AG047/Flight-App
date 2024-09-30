import { Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import HeaderWebsite from "./headerWebsite";
import RoundTrip from "./roundtrip";
import Footer from "./components/Footer";

const TravelApp = () => {
  const [tripType, setTripType] = useState("Round-trip");
  const [travelClass, setTravelClass] = useState("Economy");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travellers, setTravellers] = useState(1);

  const showForm = (type) => {
    setTripType(type);
  };
  const handleTravelClassChange = (e) => {
    setTravelClass(e.target.value);
  };

  return (
    <>
      <HeaderWebsite />
      <main>
        <div className="title-text"></div>
        <div className="main-container">
          <div className="text2">
            Compare and book cheap flights on over 500 airlines!
          </div>
          <div className="bookings">
            <ul className="panels">
              <li className="flight-tab panel">
                <a href="#">Flight</a>
              </li>
            </ul>
          </div>

          <div className="flight-panel" id="Flight-panel">
            <div className="trip-type">
              <form className="trip-type-1">
                {/* {["Round-trip", "One Way", "Multi-City"].map((type, index) => ( */}
                {["Round-trip", "One Way"].map((type, index) => (
                  <div key={index}>
                    <input
                      style={{ marginRight: "4px" }}
                      type="radio"
                      id={`option${index + 1}`}
                      name="choice"
                      value={type}
                      defaultChecked={tripType === type}
                      onClick={() => showForm(type)}
                    />
                    <label htmlFor={`option${index + 1}`}>{type}</label>
                  </div>
                ))}

                <Form.Select
                  aria-label="Default select example"
                  style={{ outline: "none", width: "auto", color: "blue" }}
                  className="Customselect"
                  value={travelClass}
                  onChange={handleTravelClassChange}
                >
                  <option className="select-option" value="Economy">
                    Economy
                  </option>
                  <option className="select-option" value="Business">
                    Business
                  </option>
                  <option className="select-option" value="First">
                    First
                  </option>
                  <option className="select-option" value="Premium_Economy">
                    Premium Economy
                  </option>
                </Form.Select>
              </form>
            </div>
            {tripType === "Round-trip" && (
              <RoundTrip travelClass={travelClass} />
            )}
            {tripType === "One Way" && (
              <RoundTrip
                isReturnDatePresent={false}
                travelClass={travelClass}
              />
            )}
            {tripType === "Multi-City" && (
              <RoundTrip travelClass={travelClass} />
            )}
          </div>
          <div className="helpline">
            <div className="helpline-text">
              <span className="call-text">
                <span style={{ fontSize: "inherit", fontWeight: "bold" }}>
                  Call us 24/7 at
                </span>

                <span style={{ color: "green" }}> 000-800-050-3540</span>
              </span>
              <br />
              <span className="desp-text">
                Need help booking? Our agents are ready!
              </span>
              <br />
              <span>Choose from over 500 airlines.</span>
            </div>
          </div>
          <div className="explore">
            Found these <span className="low-color">low</span> fare deals for
            your next trip
          </div>
          <div className="trips-container">
            <div className="trips">
              {Array(6)
                .fill()
                .map((_, index) => (
                  <div className="trip-card" key={index}>
                    <img
                      src="images/trip.jpg"
                      alt="New York City"
                      className="trip-image"
                    />
                    <div className="trip-content">
                      <h3 className="city">New York City</h3>
                      <p className="date-range">Jan 20 – Jan 27</p>
                      <p className="route">DEL – NYC</p>
                      <div className="price-section">
                        <span className="price">$759.84</span>
                        <span className="trip-type">Round Trip</span>
                      </div>
                    </div>
                    <div className="price-indicator">
                      <div className="price-bar">
                        <span className="low">$769</span>
                        <div className="price-bar-line">
                          <span className="bar"></span>
                        </div>
                        <span className="high">$1,066</span>
                      </div>
                      <p className="trip-text">
                        Similar trip cost to New York City
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default TravelApp;
