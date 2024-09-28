import { Button } from "react-bootstrap";
import React, { useState } from "react";
import HeaderWebsite from "./headerWebsite";
import RoundTrip from "./roundtrip";

const TravelApp = () => {
  const [tripType, setTripType] = useState("Round-trip");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travellers, setTravellers] = useState(1);

  const showForm = (type) => {
    setTripType(type);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({
      departure,
      arrival,
      departureDate,
      returnDate,
      travellers,
    });
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
              {/* <li className="flight-tab panel">
                <a href="#">Packages</a>
              </li>
              <li className="flight-tab panel">
                <a href="#">Hotels</a>
              </li>
              <li className="flight-tab panel">
                <a href="#">Cars</a>
              </li> */}
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
              </form>
            </div>
            {tripType === "Round-trip" && <RoundTrip />}
            {tripType === "One Way" && <RoundTrip isReturnDatePresent={false}/>}
            {tripType === "Multi-City" && <RoundTrip />}
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
        <footer>
          <div className="footer-container ">
            <div className="social-media">
              <span className="access-title">EASY ACCESS</span>
              <div className="icons">
                <span className="connect-text">Connect With Us</span>
                <span className="icon">
                  <i className="fa-brands fa-facebook"></i>
                </span>
                <span className="icon">
                  <i className="fa-brands fa-instagram"></i>
                </span>
                <span className="icon">
                  <i className="fa-brands fa-twitter"></i>
                </span>
                <span className="icon">
                  <i className="fa-brands fa-tiktok"></i>
                </span>
              </div>
            </div>
            <div className=" text-white font-weight-bold d-flex justify-content-between my-3">
              <div className=" font-weight-bold d-flex flex-column">
                <span className="my-1 link-hover " style={{ color: "orange" }}>
                  Quick Links
                </span>
                <span className="my-1 link-hover">Popular Airlines</span>
                <span className="my-1 link-hover">Popular Flight Routes</span>
                <span className="my-1 link-hover">Top U.S. Destinations</span>
                <span className="my-1 link-hover">
                  Top International Destinations
                </span>
                <span className="my-1 link-hover">Site Directories</span>
                <span className="my-1 link-hover">Stay Connected</span>
                <span className="my-1 link-hover">International Sites</span>
              </div>
              <div className="d-flex flex-column font-weight-normal">
                <span className=" my-1 font-weight-bold">Book</span>
                <span className=" my-1 icon">Cheap Flights</span>
                <span className=" my-1 icon">Cheap Hotels</span>
                <span className=" my-1 icon">Car Rentals</span>
                <span className=" my-1 icon">Vacation Packages</span>
                <span className=" my-1 icon">Group Travel</span>
                <span className=" my-1 icon">Save & Earn</span>
              </div>
              <div className="d-flex flex-column font-weight-normal">
                <span className="font-weight-bold my-1">Traveler Tools</span>
                <span className="my-1 icon">Gift Cards</span>
                <span className="my-1 icon">Check My Booking</span>
                <span className="my-1 icon">Customer Support</span>
                <span className="my-1 icon">Online Check-in</span>
                <span className="my-1 icon">Airline Baggage Fees</span>
                <span className="my-1 icon">Check Flight Status</span>
                <span className="my-1 icon">Travel Blog</span>{" "}
                <span className="my-1 icon">Local Guides</span>
              </div>
              <div className="d-flex flex-column font-weight-normal">
                <span className=" my-1  font-weight-bold">About Cheapoair</span>
                <span className="my-1 icon">About Us</span>
                <span className="my-1 icon">Press Room</span>
                <span className="my-1 icon">Careers</span>
                <span className="my-1 icon">Affiliate Program</span>
                <span className="my-1 icon">Client Testimonial</span>
                <span className="my-1 icon">Advertise With Us</span>
                <span className="my-1 icon">Newsletter</span>
              </div>
              <div className="d-flex flex-column font-weight-normal">
                <span className="font-weight-bold">Legal</span>
                <span className="my-1 icon">Privacy Policy</span>
                <span className="my-1 icon">Cookie Policy</span>
                <span className="my-1 icon">Price Match Promise</span>
                <span className="my-1 icon">Terms & Condition</span>
                <span className="my-1 icon">Taxes & Fees</span>
                <span className="my-1 icon">Our Service Fees</span>
                <span className="my-1 icon">Post Ticketing Fees</span>
                <span className="my-1 icon">Compassion Exception Policy</span>
                <span className="my-1 icon">Connection Protection</span>
                <span className="my-1 icon">Consumer Health Data Notice</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default TravelApp;
