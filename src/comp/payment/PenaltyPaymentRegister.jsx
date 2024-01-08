import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import toastr from "toastr";

const PenaltyPaymentRegister = () => {

    const { clientId, loanId } = useParams();
    const [clientInfo, setClientInfo] = useState({});
    const [schedInfo, setSchedInfo] = useState({});
    const [pastDueLoanInfo, setPastDueLoanInfo ] = useState({});
    const [paidAmount, setAmount] = useState(0);
    const [balance, setBalance] = useState(null);
    
    const navigate = useNavigate();

    const fetchClientInfoData = async () => {
        try {
            const response = await fetch("http://localhost:5034/api/client/GetClientById?id=" + clientId);
            const data = await response.json();
            setClientInfo(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const fetchPenaltyInfo = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/Loan/GetPenalizedLoanInfo?loanID=${loanId}`);
            const data = await response.json();
            setPastDueLoanInfo(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    const showNegativeInputToastr = () => {
        toastr.error('Cannot accept input; negative value was provided.', 'Incorrect input.');
    };

    const showSucessPaymentProcess = () => {
        toastr.success("Processing payment successfully", "Success");
        setTimeout(() => {
            navigate(-1);
        }, 1000)
    };

    const showErrorPaymentProcess = () => {
        toastr.error('Error on processing the payment contact the developers.', 'Error');
    };




    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = {
            loanId: loanId,
            amount: paidAmount,
        }


        console.log("form submitted:", JSON.stringify(formData));

        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_API_URL}/api/Payment/PostPenalty`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

            if (!response.ok) {
                throw new Error('Failed to submit the form');
            }

            const res = await response.json();

            if (res.status == "Ok") {
                showSucessPaymentProcess();
            }


            if (res.status == "Error") {
                showErrorPaymentProcess();
            }


        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };

    const amountChange = (e) => {
        if (e.target.value < 0) {
            showNegativeInputToastr();
        } else {
            setAmount(e.target.value);

        }
    }

    useEffect(() => {
        fetchClientInfoData();
        fetchPenaltyInfo();
    }, []);


    return (
        <Container className='container-fluid' style={{
            padding: 30,
            boxSizing: "border-box"
        }}>
            {/* <Link to={"/payment"}>back to payment</Link> */}

            <Row className='d-flex justify-content-between' style={{ alignItems: "flex-start" }}>
                <Col style={{
                    background: "whitesmoke",
                    borderRadius: 30,
                    padding: 30,
                    marginRight: 10,
                    marginBottom: 10,
                    flexGrow: 1,
                    maxWidth: 300,
                    minWidth: 200

                }} >
                    <p> <FontAwesomeIcon icon={faUser} /> : <strong>{clientInfo.name}</strong></p>
                    <p> <FontAwesomeIcon icon={faEnvelope} /> : <small>{clientInfo.email}</small> </p>
                    <p> <FontAwesomeIcon icon={faPhone} /> : <small>{clientInfo.contactNumber} </small></p>
                </Col>

                <Col style={{
                    background: "whitesmoke",
                    borderRadius: 30,
                    padding: 30,
                    flexGrow: 3

                }}  >
                    <h5>Payment Processing</h5>
                    <br />
                    {
                        pastDueLoanInfo.loanId == 0 || pastDueLoanInfo.loanId  == null ? (
                            <h5>Schedule already paid</h5>
                        ) : (
                            <>
                                <div className="d-flex flex-wrap justify-content-around">
                                    <div style={{
                                        background: "#DFA248",
                                        height: 150,
                                        width: 150,
                                        padding: 10,
                                        borderRadius: 10,
                                        gap: 30,
                                    }}>
                                        <center style={{ color: "whitesmoke" }}>
                                            Payable

                                            <h1 style={{
                                                marginTop: 25,
                                                color: "white",
                                                textShadow: '2px 2px 4px #00000059',
                                            }}>
                                                {pastDueLoanInfo.payable}
                                            </h1>
                                        </center>
                                    </div>

                                    <div style={{
                                        background: "#7F4343",
                                        height: 150,
                                        width: 150,
                                        padding: 10,
                                        borderRadius: 10
                                    }}>
                                        <center style={{ color: "whitesmoke" }}>
                                            Remaining
                                            {
                                                paidAmount == null || paidAmount == 0 || paidAmount == undefined ? (
                                                    <h1 style={{
                                                        marginTop: 25,
                                                        color: "white",
                                                        textShadow: '2px 2px 4px #00000059',
                                                    }}>
                                                        {pastDueLoanInfo.payable}
                                                    </h1>
                                                ) : (
                                                    <h1 style={{
                                                        marginTop: 25,
                                                        color: "white",
                                                        textShadow: '2px 2px 4px #00000059',
                                                    }}>
                                                        {pastDueLoanInfo.payable - paidAmount}
                                                    </h1>
                                                )
                                            }
                                        </center>

                                    </div>

                                </div>
                                <br />
                                <Form onSubmit={submitHandler}>
                                    <FormGroup>
                                        <Label>Amount to pay</Label>
                                        <Input
                                            type="number"
                                            onChange={amountChange}
                                            required
                                        ></Input>
                                    </FormGroup>
                                    <FormGroup>
                                        {
                                            paidAmount == null || paidAmount == 0 || paidAmount == undefined ? (
                                                <Button disabled type="submit" style={{ background: "#dfa248" }} >Submit Payment</Button>
                                            ) : (
                                                <Button type="submit" style={{ background: "#dfa248" }} >Submit Payment</Button>
                                            )

                                        }
                                    </FormGroup>
                                </Form>
                            </>
                        )
                    }


                </Col>
            </Row>
        </Container>

    );
}

export default PenaltyPaymentRegister;