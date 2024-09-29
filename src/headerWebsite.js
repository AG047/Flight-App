import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Dropdown,
  Button,
  Collapse,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";

const HeaderWebsite = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <Container fluid>
        <Row
          className="align-items-center"
          style={{ justifyContent: "space-around" }}
        >
          {/* Left Side: Logo */}
          <div className="align-items-center" style={{ display: "flex" }}>
            <Navbar.Brand>
              <NavLink to="/">
                <img
                  src="images/Frame 2.png"
                  alt="logo-img"
                  style={{ height: "60px", width: "140px" }}
                  className="img-fluid"
                />
              </NavLink>
            </Navbar.Brand>
          </div>

          {/* Call Us and Toggle Button */}
          <div
            className="justify-content-end align-items-center"
            style={{ display: "flex" }}
          >
            {/* Phone Number */}
            <div className="text-center d-md-none mr-4">
              <div className="justify-content-center align-items-center">
                <div
                  className="text-center"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <svg
                    aria-hidden="true"
                    class="me-2"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="phone-volume"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M97.333 506.966c-129.874-129.874-129.681-340.252 0-469.933 5.698-5.698 14.527-6.632 21.263-2.422l64.817 40.513a17.187 17.187 0 0 1 6.849 20.958l-32.408 81.021a17.188 17.188 0 0 1-17.669 10.719l-55.81-5.58c-21.051 58.261-20.612 122.471 0 179.515l55.811-5.581a17.188 17.188 0 0 1 17.669 10.719l32.408 81.022a17.188 17.188 0 0 1-6.849 20.958l-64.817 40.513a17.19 17.19 0 0 1-21.264-2.422zM247.126 95.473c11.832 20.047 11.832 45.008 0 65.055-3.95 6.693-13.108 7.959-18.718 2.581l-5.975-5.726c-3.911-3.748-4.793-9.622-2.261-14.41a32.063 32.063 0 0 0 0-29.945c-2.533-4.788-1.65-10.662 2.261-14.41l5.975-5.726c5.61-5.378 14.768-4.112 18.718 2.581zm91.787-91.187c60.14 71.604 60.092 175.882 0 247.428-4.474 5.327-12.53 5.746-17.552.933l-5.798-5.557c-4.56-4.371-4.977-11.529-.93-16.379 49.687-59.538 49.646-145.933 0-205.422-4.047-4.85-3.631-12.008.93-16.379l5.798-5.557c5.022-4.813 13.078-4.394 17.552.933zm-45.972 44.941c36.05 46.322 36.108 111.149 0 157.546-4.39 5.641-12.697 6.251-17.856 1.304l-5.818-5.579c-4.4-4.219-4.998-11.095-1.285-15.931 26.536-34.564 26.534-82.572 0-117.134-3.713-4.836-3.115-11.711 1.285-15.931l5.818-5.579c5.159-4.947 13.466-4.337 17.856 1.304z"></path>
                  </svg>
                  <span className="number d-block fw-bold text-success">
                    12345689
                  </span>
                </div>
              </div>
            </div>

            {/* Toggle Button */}
            <Button
              variant="outline-secondary"
              className="d-md-none ms-2"
              onClick={() => setOpen(!open)}
              aria-controls="collapse-content"
              aria-expanded={open}
            >
              ☰
            </Button>
          </div>

          {/* Full Nav Links (Hidden on Small Screens) */}
          <div className="d-none d-md-flex align-items-center">
            <Nav className="ms-3">
              <Nav.Link href="#" className="text-dark">
                More Travel
              </Nav.Link>
              <Nav.Link href="#" className="text-dark">
                Deals
              </Nav.Link>
            </Nav>
          </div>

          {/* Call Us Section (Hidden on Small Screens) */}
          <div className="d-none d-md-flex justify-content-center align-items-center">
            <div className="text-center">
              <span className="d-block book-now fw-bold">
                Book Now - Call Us 24/7
              </span>
              <span className="number d-block fw-bold text-success">
                12345689
              </span>
            </div>
          </div>

          {/* Sign In/Join and Language/Currency Dropdown (Hidden on Small Screens) */}
          <div className="d-none d-md-flex justify-content-end align-items-center">
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
          </div>
        </Row>

        {/* Collapsible Menu for Mobile View */}
        <Collapse in={open}>
          <div id="collapse-content" className="d-md-none">
            <Nav className="flex-column text-center">
              <Nav.Link href="#" className="text-dark">
                More Travel
              </Nav.Link>
              <Nav.Link href="#" className="text-dark">
                Deals
              </Nav.Link>
              <Nav.Link href="#" className="text-dark">
                Help
              </Nav.Link>
              <Dropdown.Divider />
              <Dropdown.Header>Languages</Dropdown.Header>
              <Dropdown.Item href="#">EN - English</Dropdown.Item>
              <Dropdown.Item href="#">ES - Spanish</Dropdown.Item>
              <Dropdown.Item href="#">FR - French</Dropdown.Item>
              <Dropdown.Item href="#">DE - German</Dropdown.Item>
              <Dropdown.Item href="#">ZH - Chinese</Dropdown.Item>
              <Dropdown.Item href="#">AR - Arabic</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Currencies</Dropdown.Header>
              <Dropdown.Item href="#">USD - United States Dollar</Dropdown.Item>
              <Dropdown.Item href="#">EUR - Euro</Dropdown.Item>
              <Dropdown.Item href="#">GBP - British Pound</Dropdown.Item>
              <Dropdown.Item href="#">JPY - Japanese Yen</Dropdown.Item>
              <Dropdown.Item href="#">AUD - Australian Dollar</Dropdown.Item>
              <Dropdown.Item href="#">CAD - Canadian Dollar</Dropdown.Item>
            </Nav>
          </div>
        </Collapse>
      </Container>
    </header>
  );
};

export default HeaderWebsite;
