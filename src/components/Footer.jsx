import React from "react";

const Footer = () => {
  return (
    <div>
      {" "}
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
          <div className=" text-white font-weight-bold d-flex justify-content-between mt-3">
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
    </div>
  );
};

export default Footer;
