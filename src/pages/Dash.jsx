import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faSignOutAlt, faMoneyBill, faFileInvoice, faMoneyBill1, faMoneyBill1Wave, faCashRegister, faUsers, faWarning, faUserAlt } from '@fortawesome/free-solid-svg-icons';


import "./dash.css"
import { Card, CardBody, CardText, CardTitle, Container } from "reactstrap";
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

 
  return (
    <div className="dash" >
      <h1>Dashboard</h1>

      <Container className="d-flex">
        <Card
          style={{
            width: '15rem',
            color: "whitesmoke",
            background: "#30b4b4",
            // padding: 30
          }}
          className='mx-3 my-4'>
          <CardBody>
            <CardTitle tag="h5">
              <FontAwesomeIcon icon={faUsers} size="2x" className='mx-1 my-1' />
              <strong>Users</strong>
            </CardTitle>
            <CardText>
              Get all the CBU Deductions from loan filterable by date
            </CardText>
          </CardBody>
        </Card>

        <Card
          style={{
            width: '15rem',
            color: "whitesmoke",
            background: "#30b4b4",
            // padding: 30
          }}
          className='mx-3 my-4'>
          <CardBody>
            <CardTitle tag="h5">
              <FontAwesomeIcon icon={faUsers} size="2x" className='mx-1 my-1' />
              <strong>Users</strong>
            </CardTitle>
            <CardText>
              Get all the CBU Deductions from loan filterable by date
            </CardText>
          </CardBody>
        </Card>

      </Container>
    </div>
  );
}

export default Dash;