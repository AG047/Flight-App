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
  ProgressBar,
} from "react-bootstrap";
import "./flightSearch.css";
import RoundTrip from "./roundtrip";
import { useLocation, useNavigate } from "react-router-dom";
import { APIKEY } from "./APIKEY";
import { AIRLINE } from "./Airline";
import AirlineCarousel from "./components/AirlineCarousel";
import useWindowWidth from "./components/useWindowWidth";

const FlightSearch = () => {
  const location = useLocation();
  const {
    departure,
    arrival,
    departureDate,
    returnDate,
    travellers,
    adults = 0,
    children = 0,
    infants = 0,
    isReturnDatePresent,
    travelClass,
  } = location.state || {};

  const initialValues = {
    departure,
    arrival,
    departureDate,
    returnDate,
    travellers,
    adults,
    children,
    infants,
    isReturnDatePresent,
    travelClass,
  };
  const [showProgressBar, setShowProgressbar] = useState(false);
  const [showAirlineCarousel, setShowAirlineCarousel] = useState(true);
  const [tripType, setTripType] = useState("Round-trip");
  const [travelClass2, setTravelClass] = useState("Economy");

  const showForm = (type) => {
    setTripType(type);
  };
  const handleTravelClassChange = (e) => {
    setTravelClass(e.target.value);
  };
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const width = useWindowWidth(); // Get the window width
  const isSmallScreen = width <= 768;
  const handleUpdateRoute = (selectedFlight) => {
    navigate("/flight-details", { state: { selectedFlight } });
  };
  const setProgressTrue = () => {
    setTimeout(() => {
      setShowProgressbar(true);
      setShowAirlineCarousel(true);
    }, 1000);
  };
  useEffect(() => {
    setProgressTrue();
  }, []);
  useEffect(() => {
    if (initialValues?.travelClass) {
      setTravelClass(travelClass);
    }
  }, []);
  useEffect(() => {
    if (departure && arrival && departureDate) {
      const fetchFlights = async () => {
        setLoading(true);
        setProgressTrue();
        try {
          let apiUrl;
          if (initialValues?.isReturnDatePresent) {
            apiUrl = `https://api.flightapi.io/roundtrip/${APIKEY}/${
              departure.split(" - ")[0]
            }/${arrival.split(" - ")[0]}/${departureDate}/${returnDate}/${
              initialValues.adults
            }/${initialValues.children}/${initialValues.infants}/${
              initialValues?.travelClass
            }/USD`;
          } else {
            apiUrl = `https://api.flightapi.io/onewaytrip/${APIKEY}/${
              departure.split(" - ")[0]
            }/${arrival.split(" - ")[0]}/${departureDate}/${
              initialValues.adults
            }/${initialValues.children}/${initialValues.infants}/${
              initialValues?.travelClass
            }/USD`;
          }
          const response = await fetch(apiUrl);
          const data = await response.json();
          setFlights(data);
        } catch (error) {
          console.error("Error fetching flight data:", error);
        } finally {
          setLoading(false);
          setShowProgressbar(false);
          setShowAirlineCarousel(false);
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
            {isSmallScreen ? (
              <>
                {showAirlineCarousel && <AirlineCarousel />}
                {showProgressBar && <ProgressBar animated now={100} />}
              </>
            ) : (
              showAirlineCarousel && <AirlineCarousel />
            )}
            {!showAirlineCarousel && (
              <>
                {/* <div className="trip-type">
                  <form className="trip-type-1">
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
                      value={travelClass2}
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
                </div> */}
                <RoundTrip
                  initialValues={initialValues}
                  isReturnDatePresent={initialValues.isReturnDatePresent}
                  customCSS={true}
                  adultsValue={adults}
                  childrenValue={children}
                  infantsValue={infants}
                  travelClass={travelClass}
                />
              </>
            )}
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

            <Col lg={9}>
              {!showAirlineCarousel && (
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
              )}

              {/* {showProgressBar && <ProgressBar animated now={100} />} */}
              <Row>
                {loading ? ( // Show loader if flights are still loading
                  <Col sm={12} className="text-center">
                    <div className="loader"></div>
                  </Col>
                ) : flights?.itineraries?.length > 0 ? (
                  flights.itineraries.map((itinerary, index) => {
                    // Fetch legs for the current itinerary
                    const itineraryLegs = itinerary.leg_ids.map((legId) =>
                      flights.legs.find((leg) => leg.id === legId)
                    );

                    // Fetch the price for this itinerary
                    const priceAmount = itinerary.cheapest_price.amount;

                    return (
                      <Col sm={12} className="mb-4" key={index}>
                        <Card className="flight-card shadow-sm flexFlightCard">
                          <div style={{ width: "100%" }}>
                            {/* Render each leg in the itinerary */}
                            {itineraryLegs.map((leg, legIndex) => {
                              const originPlace = flights?.places.find(
                                (place) => place.id === leg.origin_place_id
                              );
                              const destinationPlace = flights?.places.find(
                                (place) => place.id === leg.destination_place_id
                              );
                              const carrier = flights?.carriers.find(
                                (carrier) =>
                                  carrier.id === leg.marketing_carrier_ids[0]
                              );
                              const matchingAirline = AIRLINE.find(
                                (airline) =>
                                  airline.id === carrier?.display_code
                              );
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
                              const formatDuration = (duration) => {
                                const hours = Math.floor(duration / 60);
                                const minutes = duration % 60;
                                return `${hours}h ${minutes}m`;
                              };
                              const stopovers = leg.stop_ids
                                .map((stopIdArray) => {
                                  const stopId = stopIdArray[0];
                                  return flights.places.find(
                                    (place) => place.id === stopId
                                  );
                                })
                                .filter(Boolean);

                              return (
                                <Card.Body
                                  className="d-flex justify-content-between align-items-center"
                                  key={legIndex}
                                >
                                  {/* Flight Info */}
                                  <div
                                    className="flight-info width100 mb-4"
                                    style={{ display: "flex" }}
                                  >
                                    <div className="blueLine"></div>
                                    <div className="smallScreenDisplay">
                                      <div style={{ display: "flex" }}>
                                        <div>
                                          <img
                                            src={matchingAirline?.logo}
                                            alt={carrier?.name || "Airline"}
                                            style={{
                                              width: "50px",
                                              height: "50px",
                                            }}
                                          />
                                        </div>
                                        <div className="ml-3">
                                          <h5>
                                            {carrier
                                              ? carrier.name
                                              : "Unknown Carrier"}
                                          </h5>
                                          <p className="text-muted m-0">
                                            {leg.stop_count === 0
                                              ? "Non Stop"
                                              : `${leg.stop_count} Stop`}
                                          </p>
                                          <p>{formatDuration(leg?.duration)}</p>
                                        </div>
                                      </div>
                                      <div>
                                        {stopovers.length > 0 && (
                                          <div>
                                            {stopovers
                                              .slice(0, 5)
                                              .map((stop, index) => (
                                                <p
                                                  key={index}
                                                  className="fontSizeStops m-0"
                                                >
                                                  Stop {index + 1}:{" "}
                                                  {stop.display_name} (
                                                  {stop.display_code})
                                                </p>
                                              ))}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Flight Timings */}
                                  <div
                                    className="flight-timings width100 ml-4 ml0 text-center"
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
                                </Card.Body>
                              );
                            })}
                          </div>
                          <div
                            className="price-container text-end"
                            style={{
                              backgroundColor: "white",
                              border: "none",
                              minWidth: "200px",
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
                              onClick={() =>
                                handleUpdateRoute({
                                  itinerary,
                                  priceAmount,
                                  flights,
                                })
                              }
                            >
                              Select this Departure &gt;
                            </Button>
                          </div>
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
