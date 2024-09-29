import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { AIRLINE } from "../Airline";

// Helper function to shuffle the airline array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const AirlineCarousel = () => {
  const [shuffledAirlines, setShuffledAirlines] = useState([]);

  useEffect(() => {
    // Shuffle the airline array when the component mounts
    const shuffled = shuffleArray([...AIRLINE]);
    setShuffledAirlines(shuffled);
  }, []);

  return (
    <div style={{ height: "200px", overflow: "hidden",backgroundColor:"white",zIndex:5}} className="mb-5 mt-5">
      <Carousel
        indicators={false}
        controls={false}
        interval={2000}
        pause={false}
      >
        {shuffledAirlines.map((airlineItem, index) => (
          <Carousel.Item key={index} style={{ height: "200px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <h5>{airlineItem.name}</h5>
              <img
                src={airlineItem.logo}
                alt={airlineItem.name}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "contain",
                }}
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default AirlineCarousel;
