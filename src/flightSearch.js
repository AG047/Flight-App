import React, { useEffect, useState } from "react";
import HeaderWebsite from "./headerWebsite";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Pagination,
  ListGroup,
} from "react-bootstrap";
import "./flightSearch.css";
import RoundTrip from "./roundtrip";
import { useLocation, useNavigate } from "react-router-dom";
import { APIKEY } from "./APIKEY";

const FlightSearch = () => {
  const location = useLocation();
  const {
    departure,
    arrival,
    departureDate,
    returnDate,
    travellers,
    isReturnDatePresent,
  } = location.state || {};

  const initialValues = {
    departure,
    arrival,
    departureDate,
    returnDate,
    travellers,
    isReturnDatePresent,
  };
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleUpdateRoute = () => {
    navigate("/flight-details");
  };
  useEffect(() => {
    if (departure && arrival && departureDate) {
      const fetchFlights = async () => {
        setLoading(true);
        try {
          let apiUrl;
          if (initialValues?.isReturnDatePresent) {
            apiUrl = `https://api.flightapi.io/roundtrip/${APIKEY}/${
              departure.split(" - ")[0]
            }/${
              arrival.split(" - ")[0]
            }/${departureDate}/${returnDate}/${travellers}/0/0/Economy/USD`;
          } else {
            apiUrl = `https://api.flightapi.io/onewaytrip/${APIKEY}/${
              departure.split(" - ")[0]
            }/${
              arrival.split(" - ")[0]
            }/${departureDate}/${travellers}/0/0/Economy/USD`;
          }
          console.log(apiUrl, "apiUrl");
          const response = await fetch(apiUrl);
          const data = await response.json();
          setFlights(data);
        } catch (error) {
          console.error("Error fetching flight data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchFlights();
    }
  }, [departure, arrival, departureDate, returnDate, travellers]);
  return (
    <>
      <HeaderWebsite />
      <main>
        <Container fluid>
          <div className="mb-5">
            <RoundTrip
              initialValues={initialValues}
              isReturnDatePresent={initialValues.isReturnDatePresent}
            />
          </div>

          <Row>
            <Col
              lg={3}
              className="filter-container d-none d-lg-block"
              style={{ height: "100vh", position: "sticky", top: 0 }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "#ff9800",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "18px",
                  zIndex: 1,
                  textAlign: "center",
                }}
              >
                Coming Soon
              </div>
              <div style={{ filter: "blur(5px)" }}>
                <Card className="mb-4 shadow-sm">
                  <Card.Header>Filter by Airlines</Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Form.Check
                          type="checkbox"
                          label="United Airlines"
                          defaultChecked
                        />
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Form.Check type="checkbox" label="Emirates" />
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Form.Check type="checkbox" label="Lufthansa" />
                      </ListGroup.Item>
                      {/* Add more airline filters as needed */}
                    </ListGroup>
                  </Card.Body>
                </Card>

                <Card className="mb-4 shadow-sm">
                  <Card.Header>Departure Time</Card.Header>
                  <Card.Body>
                    <Form.Range />
                    <p>12:00 AM - 11:59 PM</p>
                  </Card.Body>
                </Card>

                <Card className="mb-4 shadow-sm">
                  <Card.Header>Stops</Card.Header>
                  <Card.Body>
                    <Form.Check type="checkbox" label="Non-stop" />
                    <Form.Check type="checkbox" label="1 Stop" defaultChecked />
                    <Form.Check type="checkbox" label="2+ Stops" />
                  </Card.Body>
                </Card>
              </div>
            </Col>

            {/* Main Flight Listings */}
            <Col lg={9}>
              <div className="top-fare-table mb-4">
                <Table responsive bordered className="shadow-sm">
                  <thead>
                    <tr>
                      <th>Show All Fares</th>
                      <th>Best Fares</th>
                      <th>Duration</th>
                      <th>Stops</th>
                      <th>Depart Time</th>
                      <th>Arrival Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Form.Check
                          type="radio"
                          name="fareOption"
                          label="Show All"
                          defaultChecked
                        />
                      </td>
                      <td>
                        <Form.Check
                          type="radio"
                          name="fareOption"
                          label="Best Fares"
                        />
                      </td>
                      <td>30h 22m</td>
                      <td>1 Stop</td>
                      <td>12:30 PM</td>
                      <td>11:45 PM</td>
                    </tr>
                    {/* Add more rows if needed */}
                  </tbody>
                </Table>
              </div>
              <Row>
                {loading ? ( // Conditional rendering based on loading state
                  <Col sm={12} className="text-center">
                    <div className="loader"></div>
                  </Col>
                ) : flights?.legs?.length > 0 ? (
                  flights?.legs?.map((leg, index) => {
                    // Find the origin and destination place codes
                    const originPlace = flights?.places.find(
                      (place) => place.id === leg.origin_place_id
                    );
                    const destinationPlace = flights?.places.find(
                      (place) => place.id === leg.destination_place_id
                    );

                    // Find the carrier name
                    const carrier = flights?.carriers.find(
                      (carrier) => carrier.id === leg.marketing_carrier_ids[0]
                    );

                    // Find the corresponding itinerary price
                    const itinerary = flights?.itineraries.find((itin) =>
                      itin.leg_ids.includes(leg.id)
                    );

                    // Format departure and arrival times
                    const departureTime = new Date(
                      leg.departure
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    });
                    const arrivalTime = new Date(
                      leg.arrival
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    });

                    // Calculate the price to display
                    const priceAmount = itinerary
                      ? itinerary.cheapest_price.amount
                      : "N/A";

                    const formatDuration = (duration) => {
                      if (!duration) return "N/A"; // Handle case where duration is not provided

                      const hours = Math.floor(duration / 60); // Calculate hours
                      const minutes = duration % 60; // Calculate remaining minutes
                      return `${hours} hour${
                        hours !== 1 ? "s" : ""
                      } ${minutes} minute${minutes !== 1 ? "s" : ""}`;
                    };

                    const stopovers = leg.stop_ids
                      .map((stopIdArray) => {
                        const stopId = stopIdArray[0]; // Get the first stop id from each array
                        return flights.places.find(
                          (place) => place.id === stopId
                        );
                      })
                      .filter(Boolean); // Filter out any undefined values
                    return (
                      <Col sm={12} className="mb-4" key={index}>
                        <Card className="flight-card shadow-sm">
                          <Card.Body className="d-flex justify-content-between align-items-center">
                            {/* Flight Info */}
                            <div className="flight-info d-flex">
                              <div className="blueLine"></div>
                              <div>
                                <h5>
                                  {carrier ? carrier.name : "Unknown Carrier"}
                                </h5>
                                <p className="text-muted">
                                  {leg.stop_count === 0
                                    ? "Non Stop"
                                    : `${leg.stop_count} Stop`}
                                </p>
                                <p>{formatDuration(leg?.duration)}</p>
                                {stopovers.length > 0 && (
                                  <div>
                                    {stopovers.slice(0, 5).map(
                                      (
                                        stop,
                                        index // Limit to 5 stops
                                      ) => (
                                        <p key={index} style={{ margin: "0",fontSize:"14px" }}>
                                          Stop {index + 1}: {stop.display_name}{" "}
                                          ({stop.display_code})
                                        </p>
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Flight Timings */}
                            <div
                              className="flight-timings text-center"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-around",
                              }}
                            >
                              <div>
                                <strong>{departureTime}</strong>
                                <p>
                                  {originPlace
                                    ? originPlace.display_code
                                    : "Unknown"}
                                </p>
                              </div>
                              <div
                                style={{
                                  width: "100px",
                                  height: "2px",
                                  background: "black",
                                }}
                              ></div>
                              <div>
                                <strong>{arrivalTime}</strong>
                                <p>
                                  {destinationPlace
                                    ? destinationPlace.display_code
                                    : "Unknown"}
                                </p>
                              </div>
                            </div>

                            {/* Price and Select Button */}
                            <div
                              className="price-container text-end"
                              style={{
                                backgroundColor: "white",
                                border: "none",
                              }}
                            >
                              <div
                                style={{
                                  fontSize: "20px",
                                  width: "100%",
                                  textAlign: "center",
                                }}
                              >
                                <strong>USD </strong>
                                <strong>{priceAmount}</strong>
                              </div>
                              <Button
                                variant="outline-primary"
                                className="select-btn"
                                onClick={handleUpdateRoute}
                              >
                                Select this Departure &gt;
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })
                ) : (
                  <Col sm={12} className="text-center">
                    <h5>No Flights for current search</h5>
                  </Col>
                )}
              </Row>

              {/* Pagination */}
              {/* <Pagination className="justify-content-center mt-4">
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Item>{4}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination> */}
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default FlightSearch;
