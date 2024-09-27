import React from "react";
import { Navbar, Nav, Container, Row, Col, Dropdown } from "react-bootstrap";

const HeaderWebsite = () => {
  return (
    <header className="bg-white shadow-sm">
      <Container fluid>
        <Row className="align-items-center">
          {/* Left Side: Logo and Tabs */}
          <Col md={4} xs={12} className="d-flex align-items-center">
            <Navbar.Brand href="#">
              <img
                src="images/Frame 2.png"
                alt="logo-img"
                style={{ height: "60px", width: "140px" }}
                className="img-fluid"
              />
            </Navbar.Brand>
            <Nav className="ms-3 d-none d-md-flex">
              <Nav.Link href="#" className="text-dark">
                More Travel
              </Nav.Link>
              <Nav.Link href="#" className="text-dark">
                Deals
              </Nav.Link>
            </Nav>
            {/* Mobile Tabs */}
            <Nav className="d-flex d-md-none">
              <Nav.Link href="#" className="text-dark">
                More Travel
              </Nav.Link>
              <Nav.Link href="#" className="text-dark">
                Deals
              </Nav.Link>
            </Nav>
          </Col>

          {/* Middle Section: Call Us */}
          <Col
            md={4}
            xs={12}
            className="d-flex justify-content-center align-items-center my-2 my-md-0"
          >
            <div className="text-center">
              <span className="d-block book-now fw-bold">
                Book Now - Call Us 24/7
              </span>
              <span className="number d-block fw-bold text-success">
                12345689
              </span>
            </div>
          </Col>

          {/* Right Side: Sign In/Join and Language/Currency Dropdown */}
          <Col
            md={4}
            xs={12}
            className="d-flex justify-content-end align-items-center"
          >
            {/* Sign In/Join */}

            {/* Mobile Sign In/Join */}
            <Nav className="d-flex d-md-none">
              <Nav.Link href="#" className="text-dark">
                Help
              </Nav.Link>
            </Nav>

            {/* Language and Currency Dropdown */}
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                variant="outline-secondary"
                className="fw-bold"
              >
                EN / USD
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Header>Languages</Dropdown.Header>
                <Dropdown.Item href="#">EN - English</Dropdown.Item>
                <Dropdown.Item href="#">ES - Spanish</Dropdown.Item>
                <Dropdown.Item href="#">FR - French</Dropdown.Item>
                <Dropdown.Item href="#">DE - German</Dropdown.Item>
                <Dropdown.Item href="#">ZH - Chinese</Dropdown.Item>
                <Dropdown.Item href="#">AR - Arabic</Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Header>Currencies</Dropdown.Header>
                <Dropdown.Item href="#">
                  USD - United States Dollar
                </Dropdown.Item>
                <Dropdown.Item href="#">EUR - Euro</Dropdown.Item>
                <Dropdown.Item href="#">GBP - British Pound</Dropdown.Item>
                <Dropdown.Item href="#">JPY - Japanese Yen</Dropdown.Item>
                <Dropdown.Item href="#">AUD - Australian Dollar</Dropdown.Item>
                <Dropdown.Item href="#">CAD - Canadian Dollar</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default HeaderWebsite;
