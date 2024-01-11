import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faSignOutAlt, faMoneyBill, faFileInvoice, faMoneyBill1, faMoneyBill1Wave, faCashRegister, faUsers, faWarning, faUserAlt, faHandshake, faMoneyBillTransfer, faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';


import "./dash.css"
import { Card, CardBody, CardText, CardTitle, Container } from "reactstrap";
function Dash() {


  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);
  const [clientData, setClientData] = useState([]);
  const [loanData, setloanData] = useState([]);
  const [trans, settrans] = useState([]);

  const getLoans = async () => {
    const response = await fetch("http://localhost:5034/api/Loan/GetTotalLoanCount");
    const data = await response.json();
    setloanData(data);
  }

  const getTrans = async () => {
    try {
        const response = await fetch(`http://localhost:5034/api/Transaction/total-GetTotalCollectedToday-today`);
        const data = await response.json();
        settrans(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
    }
};

  const getTodayTotal = () => {
    const currentDate = new Date().toLocaleDateString();
    const todayTransactions = trans.filter((transaction) => {
      return new Date(transaction.paymentDate).toLocaleDateString() === currentDate;
    });
    const totalCollectedToday = todayTransactions.reduce((sum, transaction) => {
      return sum + (transaction.amount || 0);
    }, 0);
    return totalCollectedToday;
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5034/api/client/GetClients");
        const data = await response.json();
        setClientData(data);
        getLoans();
        getTrans();
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);




  return (
    <div className="dash" >
      <h1>Dashboard</h1>

      <Container className="d-flex flex-wrap">
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
              <strong>Borrowers</strong>
            </CardTitle>
            <CardText >
              <center>
                <h3>
                  <strong>
                    {clientData.length}
                  </strong>
                </h3>
              </center>
            </CardText>
          </CardBody>
        </Card>

        <Card
          style={{
            width: '15rem',
            color: "whitesmoke",
            background: "#3069b4",
            // padding: 30
          }}
          className='mx-3 my-4'>
          <CardBody>
            <CardTitle tag="h5">
              <FontAwesomeIcon icon={faHandshake} size="2x" className='mx-1 my-1' />
              <strong>Users</strong>
            </CardTitle>
            <CardText>
              <center>
                <h3>
                  <strong>
                    {loanData.length}
                  </strong>
                </h3>
              </center>
            </CardText>
          </CardBody>
        </Card>

        <Card
          style={{
            width: '15rem',
            color: "whitesmoke",
            background: "#b47830",
            // padding: 30
          }}
          className='mx-3 my-4'>
          <CardBody>
            <CardTitle tag="h5">
              <FontAwesomeIcon icon={faMoneyBillTrendUp} size="2x" className='mx-1 my-1' />
              <strong>Collected Today</strong>
            </CardTitle>
            <CardText>
              <center>
                <h3>
                  <strong>
                    {getTodayTotal().toFixed(2)}
                  </strong>
                </h3>
              </center>
            </CardText>
          </CardBody>
        </Card>

      </Container>
    </div>
  );
}

export default Dash;