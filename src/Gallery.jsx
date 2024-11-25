// Task 2: Tour List Component
import React, { useState, useEffect } from "react";

const Gallery = () => {
  const [tours, setTours] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchTours = async () => {
      try {
        // Fetching data using AllOrigins to bypass CORS issues
        const response = await fetch(
          "https://api.allorigins.win/get?url=https://course-api.com/react-tours-project"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tours"); 
        }

        const data = await response.json(); 
        const toursData = JSON.parse(data.contents); 

        setTours(toursData); 
        setLoading(false); 
      } catch (err) {
        setError(err.message); 
        setLoading(false); 
      }
    };

    fetchTours(); 
  }, []); 

  const removeTour = (id) => {
    setTours((prevTours) => prevTours.filter((tour) => tour.id !== id)); 
  };

  if (loading) return <p>Loading...</p>; 
  if (error) return <p>Error: {error}</p>; 

  return (
    <div className="gallery">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} removeTour={removeTour} /> 
      ))}
    </div>
  );
};

const TourCard = ({ tour, removeTour }) => {
  const [showMore, setShowMore] = useState(false); 

  return (
    <div className="tour-card">
      <img src={tour.image} alt={tour.name} />
      <h2>{tour.name}</h2>
      <p className="tour-price">${tour.price}</p>
      <p className="tour-description">
        {showMore ? tour.info : `${tour.info.substring(0, 100)}...`} 

        <button
          className="read-more"
          onClick={() => setShowMore((prev) => !prev)} 
        >
          {showMore ? "Show Less" : "Read More"}
        </button>
        
      </p>
      <button
        className="not-interested"
        onClick={() => removeTour(tour.id)} 
      >
        Not Interested
      </button>
    </div>
  );
};

export default Gallery; 