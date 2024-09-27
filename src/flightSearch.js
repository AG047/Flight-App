import React from "react";
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

const FlightSearch = () => {
  return (
    <>
      <HeaderWebsite />
      <main>
        <Container fluid>
          <Row>
            {/* Sidebar Filter - Visible on larger screens */}
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
              {/* Top Fare Options Section */}
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

              {/* Flight Listings */}
              <Row>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
                  <Col sm={12} className="mb-4" key={index}>
                    <Card className="flight-card shadow-sm">
                      <Card.Body className="d-flex justify-content-between align-items-center">
                        {/* Flight Info */}
                        <div className="flight-info">
                          <h5>United Airlines</h5>
                          <p className="text-muted">2 Stops • 30h 22m</p>
                          <p className="time">11:35pm • DEL</p>
                        </div>

                        {/* Flight Timings */}
                        <div className="flight-timings text-center">
                          <p className="time">11:35pm</p>
                          <span>DEL - LAX</span>
                        </div>

                        {/* Price and Select Button */}
                        <div
                          className="price-container text-end "
                          style={{ backgroundColor: "white", border: "none" }}
                        >
                          <h5 className="price">USD 1663</h5>
                          <p className="text-muted">As low as $149</p>
                          <p className="text-muted">
                            Price per person (incl. taxes & fees)
                          </p>
                          <Button variant="warning" className="select-btn">
                            Select &gt;
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              {/* Pagination */}
              <Pagination className="justify-content-center mt-4">
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Item>{4}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default FlightSearch;
