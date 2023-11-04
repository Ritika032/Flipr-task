import React, { useState, useEffect } from "react";
import "./Card.css";

function Card() {
  // Define API 
  const url = "https://api.nobelprize.org/v1/prize.json";

  //state variables using useState
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [showAllPrizes, setShowAllPrizes] = useState(false);

  // Function to fetch data from the API
  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d.prizes || []));
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchInfo();
  }, []);

  // Get unique filter categories and years from the data
  const categories = [...new Set(data.map((prize) => prize.category))];
  const years = [...new Set(data.map((prize) => prize.year))].filter(
    (year) => year >= 1900 && year <= 2018
  );

  // Function to filter prizes based on selected criteria
  const filterPrizes = () => {
    const filteredPrizes = data.filter((prize) => {
      return (
        (selectedCategory === "All" || prize.category === selectedCategory) &&
        (selectedYear === "All" || prize.year.toString() === selectedYear)
      );
    });

    setData(filteredPrizes);
  };

  // Function to toggle showing all prizes or a limited number
  const toggleShowAllPrizes = () => {
    setShowAllPrizes(!showAllPrizes);
  };

  // Determine which prizes to display based on the showAllPrizes state
  const displayedPrizes = showAllPrizes ? data : data.slice(0, 4);

  return (
    <div className="App">
      <div className="nav">
        <h1 style={{ color: "Black" }}>Prizes</h1>

        <div className="filter">

          <label className="labelby">Filter by Category:</label>

          <select
            className="selectby"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label className="labelby">Filter by Year:</label>
          
          <select
            className="selectby"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="All">All</option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>

          <button onClick={filterPrizes}>Select</button>
        </div>
        
        {/* Prize-container-box */}
      </div>
      <div className="prize-container">
        {displayedPrizes?.map((prize, index) => {
          return (
            <div key={index} className="prize">
              <h2 style={{ color: "Purple" , paddingBottom: "25px" }}>{prize.category}</h2>
              <p style={{ paddingBottom: "20px" }}>{prize.year}</p>
              <ul >
                {prize.laureates?.map((laureate, laureateIndex) => (
                  <li style={{ paddingBottom: "20px" }} key={laureateIndex}>
                    <strong>
                      {laureate.firstname} {laureate.surname}{" "}
                    </strong>{" "}
                    : {laureate.motivation}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="btn">
        {!showAllPrizes && data.length > 4 && (
          <button onClick={toggleShowAllPrizes}>Show More</button>
        )}
      </div>
    </div>
  );
}

export default Card;
