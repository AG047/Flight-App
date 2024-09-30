// import logo from "./logo.svg";
import "./App.css";
import FlightDetails from "./FlightDetails";
import FlightSearch from "./flightSearch";
//import FlightSearch from "./FlightSearch";
import TravelApp from "./travel";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  // return (
  //   <div className="App">
  //     <TravelApp />
  //     <header className="App-header"></header>
  //   </div>
  // );
  return (
    <Router>
      <div>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<TravelApp />} />

          {/* Flight Search Page */}
          <Route path="/flight-search" element={<FlightSearch />} />
          <Route path="/flight-details" element={<FlightDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;