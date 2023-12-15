import React, { useState, useEffect } from "react";


import "./dash.css"
function Dash() {

  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5034/weatherforecast');
        const data = await response.json();
        setForecastData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather forecast:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const postData = {
    fullName: "Full name",
    gender: "Female",
    birthDate: "1991-12-05",
    province: "0722",
    city: "072211",
    barangay: "072211011",
    additionalAddressInfo: "purok sampaguita",
    email: "test@email.com",
    contactNumber: "091238753847",
    loanType: "Daily",
    capital: "6000",
    interest: "10",
    noOfPayments: "60",
    deductCBU: "100",
    deductInsurance: "100",
    deductOther: "100",
  };

  // Assuming you are making this request from a React component
  const makePostRequest = async () => {
    try {
      const response = await fetch("http://localhost:5034/api/Custom/PostClient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  //   // Call the function to make the POST request
  //   makePostRequest();

  return (
    <div className="dash">
      <h1>Dashboard</h1>
      <h2>Weather Forecast</h2>
      <button onClick={makePostRequest}>Send data</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {forecastData.map((forecast, index) => (
            <li key={index}>
              {forecast.date}: {forecast.temperatureC}°C, {forecast.summary}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dash;