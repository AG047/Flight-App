import React, { useState, useEffect } from "react";
import HeaderWebsite from "./headerWebsite";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const FlightDetails = () => {
  const location = useLocation();
  const { selectedFlight } = location.state || {};

  console.log("Selected Flight Data:", selectedFlight);

  const priceAmount = selectedFlight?.priceAmount;
  const formattedPriceAmount = priceAmount?.toFixed(2);
  let [amountInwhole, amountInCents] = [0, 0];
  if (formattedPriceAmount) {
    [amountInwhole, amountInCents] = formattedPriceAmount?.split(".");
  }
  const [traveler, setTraveler] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTraveler((prev) => ({ ...prev, [name]: value }));
  };

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
    });
  };

  // Extract flight data
  const getFlightDetails = () => {
    const itinerary = selectedFlight?.itinerary;
    const legs = selectedFlight?.flights?.legs;
    const segments = selectedFlight?.flights?.segments;
    const places = selectedFlight?.flights?.places; // places is an array
    const legData = legs?.filter((leg) => itinerary.leg_ids.includes(leg.id));

    return legData?.map((leg, index) => {
      // Find the origin and destination places using the leg's place IDs
      const originPlace = places.find(
        (place) => place.id === leg.origin_place_id
      );
      console.log(originPlace);
      const destinationPlace = places.find(
        (place) => place.id === leg.destination_place_id
      );

      const departureDate = formatDate(leg.departure);
      const arrivalDate = formatDate(leg.arrival);
      const duration = formatDuration(leg.duration); // duration in minutes
      const stopsCount = leg.stop_count;

      const flightSegment = segments.find((segment) =>
        leg.segment_ids.includes(segment.id)
      );
      const marketingCarrier =
        selectedFlight?.flights?.query?.marketing_carrier_ids?.find(
          (carrierId) => carrierId === flightSegment.marketing_carrier_id
        );
      console.log(marketingCarrier, "marketingCarriermarketingCarrier");
      const carrierId = flightSegment?.marketing_carrier_id;
      const carrier = selectedFlight?.flights?.carriers.find(
        (carrier) => carrier.id === carrierId
      );
      const carrierName = carrier ? carrier.name : "Unknown Carrier";

      let stopoverPlaces = [];
      if (leg.stop_ids.length > 0) {
        stopoverPlaces = leg.stop_ids.flat().map((stopId) => {
          const place = places.find((place) => place.id === stopId);
          return place ? place.name : "Unknown Stop";
        });
      }

      return {
        origin: originPlace?.name, // Use the name property for display
        originCode: originPlace?.display_code,
        destination: destinationPlace?.name,
        destinationCode: destinationPlace?.display_code,
        departureDate,
        arrivalDate,
        duration,
        stopsCount,
        flightNumber: flightSegment.marketing_flight_number,
        carrierName,
        stopoverPlaces,
      };
    });
  };

  const flightDetails = getFlightDetails();
  console.log(flightDetails, "flightDetails");

  return (
    <>
      <HeaderWebsite />
      <main>
        <Container>
          <Row className="my-4">
            <Col md={8}>
              <Card>
                <Card.Header>
                  <h3 style={{ fontWeight: "600" }}>Flight Details</h3>
                </Card.Header>
                <Card.Body>
                  {flightDetails?.map((flight, index) => (
                    <div key={index}>
                      <p className="m-0">
                        <strong style={{ fontSize: "20px" }}>
                          {flight.origin} to {flight.destination}
                        </strong>
                        <span> - {flight.departureDate}</span>
                      </p>
                      <p className="">
                        Travel Time: {flight.duration},{" "}
                        {flight.stopsCount > 0
                          ? `${flight.stopsCount} stop`
                          : "Non Stop"}
                      </p>
                      <p>
                        <strong style={{ fontSize: "20px" }}>
                          {flight.departureDate} --- {flight.arrivalDate}
                        </strong>
                      </p>
                      <p>
                        <strong> {flight.originCode} </strong> ({flight.origin})
                        - <strong>{flight.destinationCode}</strong> (
                        {flight.destination})
                      </p>
                      <p>
                        <strong>Flight Time :</strong>
                        {flight.duration}
                      </p>
                      <Row>
                        <Col md={6}>
                          <div>
                            <strong>{flight.carrierName}</strong>
                          </div>
                          <div>Flight {flight.flightNumber}</div>
                        </Col>
                        <Col md={6}>
                          <div>
                            <strong>Cabin:</strong> Economy
                          </div>
                        </Col>
                      </Row>
                      {/* Add stopover details if any */}
                      {flight.stopoverPlaces.length > 0 && (
                        <div style={{ color: "#b28401" }} className="mt-4">
                          {flight.stopoverPlaces.map((stop, idx) => (
                            <div key={idx}>
                              Stop {idx + 1}: {stop}
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="mt-5"></div>
                    </div>
                  ))}
                </Card.Body>
              </Card>
              <Card>
                <Card.Header>
                  <h3>Traveler Information</h3>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={traveler.email}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="d-flex mt-4 mb-4" style={{ gap: "20px" }}>
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={traveler.firstName}
                        onChange={handleInputChange}
                        required
                      />
                      <Form.Control
                        type="text"
                        name="middleName"
                        placeholder="Middle Name"
                        value={traveler.middleName}
                        onChange={handleInputChange}
                      />
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={traveler.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="d-flex">
                      <div style={{ width: "50%" }}>
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                          type="date"
                          name="dob"
                          value={traveler.dob}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div style={{ width: "50%" }} className="text-center">
                        <Form.Label>Gender</Form.Label>
                        <div className="d-flex justify-content-around">
                          <Form.Check
                            type="radio"
                            label="Male"
                            name="gender"
                            value="Male"
                            checked={traveler.gender === "Male"}
                            onChange={handleInputChange}
                            required
                          />
                          <Form.Check
                            type="radio"
                            label="Female"
                            name="gender"
                            value="Female"
                            checked={traveler.gender === "Female"}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
              <div className="text-center">
                <Button
                  variant="warning"
                  className="mt-3"
                  style={{ minWidth: "320px" }}
                >
                  Continue to Seats
                </Button>
              </div>
            </Col>
            <Col md={4}>
              {/* Price Summary */}
              <Card>
                <h4 className="m-4">Price Details (USD)</h4>
                <Card.Body>
                  <div className="d-flex justify-content-between mb-2">
                    <div>Travelers</div>
                    <div>Subtotal</div>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <div>Adult</div>
                    <div>
                      USD {amountInwhole}.<sup>{amountInCents}</sup>
                    </div>
                  </div>
                  {/* <div className="d-flex justify-content-between mb-2">
                    <div>Agency Fees</div>
                    <div>
                      USD 27.<sup>96</sup>
                    </div>
                  </div> */}
                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <strong> Total Price (USD)</strong>
                    </div>
                    <div>
                      <strong>
                        USD {amountInwhole}.<sup>{amountInCents}</sup>
                      </strong>
                    </div>
                  </div>
                  <Button
                    variant="warning"
                    className="mt-3"
                    style={{ width: "100%" }}
                  >
                    Continue to Seats
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default FlightDetails;
