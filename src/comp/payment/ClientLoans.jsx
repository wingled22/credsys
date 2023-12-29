import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Col, Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons"

import LoanScheduleModal from "../LoanScheduleModal";
import LoanSchedulePaymentModal from "./LoanSchedulePaymentModal.jsx";



const ClientLoans = ({ match }) => {
  const { clientId } = useParams();
  const [loans, setLoans] = useState([]);
  const [clientInfo, setClientInfo] = useState({});
  const [loadingLoans, setLoadingLoans] = useState(true);
  const [schedModalToggle, setSchedModalToggle] = useState(false);
  const toggle = () => setSchedModalToggle(!schedModalToggle);

  const fetchClientInfoData = async () => {
    try {
      const response = await fetch("http://localhost:5034/api/client/GetClientById?id=" + clientId);
      const data = await response.json();

      setClientInfo(data);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const fetchClientLoansData = async () => {
    try {
      const response = await fetch("http://localhost:5034/api/client/GetClientLoans?id=" + clientId);
      const data = await response.json();

      setLoans(data)
      setLoadingLoans(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoadingLoans(false);
    }
  }

  useEffect(() => {
    fetchClientInfoData();
    fetchClientLoansData();
  }, [])

  return (
    <Col style={{
      background: "whitesmoke",
      minWidth: 400,
      borderRadius: 30,
      padding: 30
    }}>
      <h2>Client Loans</h2>
      <p>Name: {clientInfo.name} </p>
      <Link to={"/payment"}>back to payment</Link>

      {loadingLoans ? (
        <h1>loading</h1>
      ) : (
        <Table bordered striped size="sm">
          <thead>
            <tr>
              <th>Type</th>
              <th>Total Payable</th>
              <th>Capital</th>
              <th>Interest</th>
              <th>Interest Amount</th>
              <th>Loan Receivable</th>
              <th>No Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loanData) => {
              return (
                <tr key={`loanID-${loanData.id}`}>
                  <td>{loanData.type}</td>
                  <td>{loanData.loanAmount}</td>
                  <td>{loanData.capital}</td>
                  <td>{loanData.interest}</td>
                  <td>{loanData.interestedAmount}</td>
                  <td>{loanData.loanReceivable}</td>
                  <td>{loanData.noPayment}</td>
                  <td>
                    <Button
                      color="info"
                      size="sm"
                      //style={{marginRight: 10}}
                      className="mx-1"
                      onClick={() => toggle()}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Button>

                  </td>
                  <LoanSchedulePaymentModal schedModalToggle={schedModalToggle} toggle={toggle} id={loanData.id} />
                </tr>



              );
            })}
          </tbody>
        </Table>
      )}
    </Col>
  );
}

export default ClientLoans;
