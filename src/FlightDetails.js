import React, { useState } from "react";
import HeaderWebsite from "./headerWebsite";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";

const FlightDetails = () => {
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
                  <div>
                    <p className="m-0">
                      <strong style={{ fontSize: "20px" }}>
                        New Delhi IGI to Dallas Fort Worth
                      </strong>
                      <span> - Tue, Oct 01</span>
                    </p>
                    <p className="">Travel Time: 22h 01m, 1 stop</p>
                    <p>
                      <strong style={{ fontSize: "20px" }}>
                        11:30 pm --- 6:20 am
                      </strong>
                      <span>, Oct 02</span>
                    </p>
                    <p>
                      {" "}
                      <strong> DEL</strong> (New Delhi IGI) -{" "}
                      <strong>JFK</strong> (New York Kennedy)
                    </p>
                    <p>
                      <strong>Flight Time :</strong>
                      16h 20m
                    </p>
                    <Row>
                      <Col md={6}>
                        <div>
                          <strong>American Airlines</strong>
                        </div>
                        <div>Flight 293 - Aircraft 77W</div>
                      </Col>
                      <Col md={6}>
                        <div>
                          <strong>Cabin:</strong> Coach
                        </div>
                        <div>
                          <strong>Brand Name:</strong> Main
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div style={{ color: "#b28401" }} className="mt-4">
                    Stop 1 : 1h 40m in JFK (New York Kennedy)
                  </div>

                  <div className="mt-5">
                    <p className="m-0">
                      <strong style={{ fontSize: "20px" }}>
                        New Delhi IGI to Dallas Fort Worth
                      </strong>
                      <span> - Tue, Oct 01</span>
                    </p>
                    <p className="">Travel Time: 22h 01m, 1 stop</p>
                    <p>
                      <strong style={{ fontSize: "20px" }}>
                        11:30 pm --- 6:20 am
                      </strong>
                      <span>, Oct 02</span>
                    </p>
                    <p>
                      {" "}
                      <strong> DEL</strong> (New Delhi IGI) -{" "}
                      <strong>JFK</strong> (New York Kennedy)
                    </p>
                    <p>
                      <strong>Flight Time :</strong>
                      16h 20m
                    </p>
                    <Row>
                      <Col md={6}>
                        <div>
                          <strong>American Airlines</strong>
                        </div>
                        <div>Flight 293 - Aircraft 77W</div>
                      </Col>
                      <Col md={6}>
                        <div>
                          <strong>Cabin:</strong> Coach
                        </div>
                        <div>
                          <strong>Brand Name:</strong> Main
                        </div>
                      </Col>
                    </Row>
                  </div>
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
                        style={{ paddingTop: "25px", paddingBottom: "25px" }}
                        value={traveler.firstName}
                        onChange={handleInputChange}
                        required
                      />

                      <Form.Control
                        type="text"
                        name="middleName"
                        placeholder="Middle Name"
                        style={{ paddingTop: "25px", paddingBottom: "25px" }}
                        value={traveler.middleName}
                        onChange={handleInputChange}
                      />

                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        style={{ paddingTop: "25px", paddingBottom: "25px" }}
                        value={traveler.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    {/* </Form.Row> */}
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
                      USD 1,363.<sup>44</sup>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <div>Agency Fees</div>
                    <div>
                      USD 27.<sup>96</sup>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <strong> Total Price (USD)</strong>
                    </div>
                    <div>
                      <strong>
                        USD 1,391.<sup>40</sup>
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
