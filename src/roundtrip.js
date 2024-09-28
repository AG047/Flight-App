import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faLocationDot,
  faArrowsAltH,
  faUser,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { APIKEY } from "./APIKEY";

const RoundTrip = ({ initialValues, isReturnDatePresent = true }) => {
  const [departure, setDeparture] = useState(initialValues?.departure || "");
  const [arrival, setArrival] = useState(initialValues?.arrival || "");
  const [departureDate, setDepartureDate] = useState(
    initialValues?.departureDate || ""
  );
  const [returnDate, setReturnDate] = useState(initialValues?.returnDate || "");
  const [travellers, setTravellers] = useState(initialValues?.travellers || 1);
  const [filteredDepartures, setFilteredDepartures] = useState([]);
  const [filteredArrivals, setFilteredArrivals] = useState([]);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [loadingDeparture, setLoadingDeparture] = useState(false);
  const [loadingArrival, setLoadingArrival] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const navigate = useNavigate();
  useEffect(() => {
    if (initialValues) {
      setDeparture(initialValues.departure);
      setArrival(initialValues.arrival);
      setDepartureDate(initialValues.departureDate);
      setReturnDate(initialValues.returnDate);
      setTravellers(initialValues.travellers);
    }
  }, [initialValues]);
  const debounceFetch = (value, type) => {
    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(async () => {
      if (type === "departure") {
        setLoadingDeparture(true); // Set loading to true for departure
        setFilteredDepartures([]);
      } else {
        setLoadingArrival(true); // Set loading to true for arrival
        setFilteredArrivals([]);
      }
      try {
        const airportResponse = await fetch(
          `https://api.flightapi.io/iata/${APIKEY}?name=${value}&type=airport`
        );
        // const airlineResponse = await fetch(
        //   `https://api.flightapi.io/iata/${APIKEY}?name=${value}&type=airline`
        // );

        const airportData = await airportResponse.json();
        // const airlineData = await airlineResponse.json();

        // const combinedData = [...airportData.data, ...airlineData.data];
        const combinedData = [...airportData.data];

        if (type === "departure") {
          setFilteredDepartures(combinedData);
        } else if (type === "arrival") {
          setFilteredArrivals(combinedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (type === "departure") {
          setLoadingDeparture(false); // Set loading to false for departure
        } else {
          setLoadingArrival(false); // Set loading to false for arrival
        }
      }
    }, 500); // Debounce time of 300ms

    setDebounceTimer(timer); // Store the timer
  };

  const handleDepartureChange = (e) => {
    const input = e.target.value;
    setDeparture(input);
    if (input.length > 0) {
      debounceFetch(input, "departure");
    } else {
      setFilteredDepartures([]);
    }
  };

  const handleArrivalChange = (e) => {
    const input = e.target.value;
    setArrival(input);
    if (input.length > 1) {
      debounceFetch(input, "arrival");
    } else {
      setFilteredArrivals([]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const today = new Date();
    const departureDateObj = new Date(departureDate);
    const returnDateObj = new Date(returnDate);

    // Validate dates
    if (departureDateObj <= today) {
      setErrorMessage("Departure date must be in the future.");
      return;
    }

    if (returnDateObj <= departureDateObj) {
      setErrorMessage("Return date must be after the departure date.");
      return;
    }
    setErrorMessage("");
    console.log({ departure, arrival, departureDate, returnDate, travellers });
    navigate("/flight-search", {
      state: {
        departure,
        arrival,
        departureDate,
        returnDate,
        travellers,
        isReturnDatePresent,
      },
    });
  };

  return (
    <div>
      <form
        className="d-flex flex-wrap align-items-center"
        onSubmit={handleFormSubmit}
        style={{ gap: "6px", marginTop: "20px", padding: "0 10px" }}
      >
        {/* Departure */}
        <div className="position-relative" style={{ flex: "1 1 150px" }}>
          <FontAwesomeIcon
            icon={faLocationDot}
            className="position-absolute"
            style={{
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#333",
            }}
          />
          <input
            type="text"
            value={departure}
            onChange={handleDepartureChange}
            placeholder="DEL"
            required
            className="form-control"
            style={{
              paddingLeft: "40px",
              paddingRight: "10px",
              minHeight: "48px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "500",
              borderColor: "#ccc",
            }}
          />
          {filteredDepartures.length > 0 && (
            <ul className="suggestions-dropdown" id="suggestion">
              {filteredDepartures.map((airport, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setDeparture(
                      `${airport.iata || airport.fs} - ${airport.name}`
                    );
                    setFilteredDepartures([]);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPlane}
                    style={{ marginRight: "8px" }}
                  />
                  {airport.iata || airport.fs} - {airport.name}
                </li>
              ))}
            </ul>
          )}
          <ul
            className="suggestions-dropdown"
            id="suggestion"
            style={{ width: "100%", overflow: "hidden" }}
          >
            {loadingDeparture && (
              <li className="loader">
                <span className="loader"></span>
              </li>
            )}
          </ul>
        </div>

        {/* Swap Button */}
        <div
          className="text-center"
          style={{ width: "40px", fontSize: "20px", cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faArrowsAltH} />
        </div>

        {/* Arrival */}
        <div className="position-relative" style={{ flex: "1 1 150px" }}>
          <FontAwesomeIcon
            icon={faLocationDot}
            className="position-absolute"
            style={{
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#333",
            }}
          />
          <input
            type="text"
            value={arrival}
            onChange={handleArrivalChange}
            placeholder="Anywhere"
            required
            className="form-control"
            style={{
              paddingLeft: "40px",
              paddingRight: "10px",
              minHeight: "48px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "500",
              borderColor: "#ccc",
            }}
          />
          {filteredArrivals.length > 0 && (
            <ul className="suggestions-dropdown" id="arrival-suggestion">
              {filteredArrivals.map((airport, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setArrival(
                      `${airport.iata || airport.fs} - ${airport.name}`
                    );
                    setFilteredArrivals([]);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPlane}
                    style={{ marginRight: "8px" }}
                  />
                  {airport.iata || airport.fs} - {airport.name}
                </li>
              ))}
            </ul>
          )}
          <ul
            className="suggestions-dropdown"
            id="suggestion"
            style={{ width: "100%", overflow: "hidden" }}
          >
            {loadingArrival && (
              <li className="loader">
                <span className="loader"></span>
              </li>
            )}
          </ul>
        </div>

        {/* Departure Date */}
        <div className="position-relative" style={{ flex: "1 1 150px" }}>
          <FontAwesomeIcon
            icon={faCalendar}
            className="position-absolute"
            style={{
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#333",
            }}
          />
          <input
            required
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="form-control"
            style={{
              paddingLeft: "40px",
              paddingRight: "10px",
              minHeight: "48px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "500",
              borderColor: "#ccc",
            }}
          />
        </div>

        {/* Return Date */}
        {isReturnDatePresent && (
          <div className="position-relative" style={{ flex: "1 1 150px" }}>
            <FontAwesomeIcon
              icon={faCalendar}
              className="position-absolute"
              style={{
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#333",
              }}
            />
            <input
              type="date"
              required={isReturnDatePresent}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="form-control"
              style={{
                paddingLeft: "40px",
                paddingRight: "10px",
                minHeight: "48px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "500",
                borderColor: "#ccc",
              }}
            />
          </div>
        )}

        {/* Travellers */}
        <div className="position-relative" style={{ flex: "1 1 120px" }}>
          <FontAwesomeIcon
            icon={faUser}
            className="position-absolute"
            style={{
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#333",
            }}
          />
          <input
            type="number"
            value={travellers}
            onChange={(e) => setTravellers(e.target.value)}
            required
            min="1"
            max="10"
            className="form-control"
            style={{
              paddingLeft: "40px",
              paddingRight: "10px",
              minHeight: "48px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "500",
              borderColor: "#ccc",
            }}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="text-nowrap"
          style={{ minHeight: "48px", padding: "0 30px" }}
        >
          Search
        </Button>
      </form>
      {errorMessage && <div className="text-danger mb-2">{errorMessage}</div>}
    </div>
  );
};

export default RoundTrip;
