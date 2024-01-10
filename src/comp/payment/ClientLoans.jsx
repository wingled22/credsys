import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Col, Table, Button, Row, Container } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye, faMailBulk, faPerson, faPhone, faUser, faVoicemail } from "@fortawesome/free-solid-svg-icons"

import LoanScheduleModal from "../LoanScheduleModal";
import LoanSchedulePaymentModal from "./LoanSchedulePaymentModal.jsx";



const ClientLoans = ({ match }) => {
  const { clientId } = useParams();
  const [loans, setLoans] = useState([]);
  const [clientInfo, setClientInfo] = useState({});
  const [loadingLoans, setLoadingLoans] = useState(true);
  const [schedModalToggle, setSchedModalToggle] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);



  const toggle = () => setSchedModalToggle(!schedModalToggle);

  const renderLoanSchedPaymentModal = (loanId, clientId) => {
    return <LoanSchedulePaymentModal schedModalToggle={schedModalToggle} toggle={toggle} id={loanId} clientId={clientId} />
  }

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
    <Container className='container-fluid' style={{
      // background: "whitesmoke",
      // minWidth: 400,
      // borderRadius: 30,
      padding: 30,
      boxSizing: "border-box"
    }}>
      {/* <Link to={"/payment"}>back to payment</Link> */}

      <Row className='d-flex justify-content-between'>
        <Col style={{
          background: "whitesmoke",
          borderRadius: 30,
          padding: 30,
          marginRight: 10,
          marginBottom: 10,
          maxWidth: 300


        }} >

          <h4> <FontAwesomeIcon icon={faUser} /> : {clientInfo.name}</h4>
          <p> <FontAwesomeIcon icon={faEnvelope} /> : {clientInfo.email} </p>
          <p> <FontAwesomeIcon icon={faPhone} /> : {clientInfo.contactNumber} </p>


        </Col>
        <Col style={{
          background: "whitesmoke",
          borderRadius: 30,
          padding: 30,

        }}  >
          <h5>Loan Information</h5>
          {loadingLoans ? (
            <h1>loading</h1>
          ) : (
            <Table bordered responsive striped size="sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Total Payable</th>
                  <th>Capital</th>
                  <th>Interest</th>
                  <th>Interest Amount</th>
                  <th>Collectables</th>
                  <th>Collected</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loanData) => {

                  if(loanData.totalPenalty == 0 ){
                    return (
                      <tr key={`loanID-${loanData.id}`}>
                        <td>{loanData.id}</td>
                        <td>{loanData.type}</td>
                        <td>{loanData.loanAmount}</td>
                        <td>{loanData.capital}</td>
                        <td>{loanData.interest}</td>
                        <td>{loanData.interestedAmount}</td>
                        <td>{loanData.loanAmount + loanData.totalPenalty - loanData.collected}</td>
                        <td>{loanData.collected}</td>
                        <td>
                          <Button
                            color="info"
                            size="sm"
                            //style={{marginRight: 10}}
                            className="mx-1"
                            onClick={(e, row) => {
                              setSelectedLoan(loanData.id);
                              toggle();
                            }}
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </Button>
  
                        </td>
  
  
                      </tr>
  
  
  
                    );
                  }
                })}
              </tbody>
              {selectedLoan && (
                <LoanSchedulePaymentModal
                  schedModalToggle={schedModalToggle}
                  toggle={toggle}
                  id={selectedLoan}
                  clientId={clientInfo.id}
                />
              )}
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ClientLoans;
