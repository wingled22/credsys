import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";



const PaymentRegister = () => {

    const { clientId, scheduleId } = useParams();
    const [clientInfo, setClientInfo] = useState({});
    const [schedInfo, setSchedInfo] = useState({});
    const [amount, setAmount] = useState(null);
    const [balance, setBalance] = useState(null);

    const fetchClientInfoData = async () => {
        try {
            const response = await fetch("http://localhost:5034/api/client/GetClientById?id=" + clientId);
            const data = await response.json();
            setClientInfo(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const fetchSchedInfoData = async () => {
        try {
            const response = await fetch("http://localhost:5034/api/schedule/GetScheduleById?id=" + scheduleId);
            const data = await response.json();
            setSchedInfo(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchClientInfoData();
        fetchSchedInfoData();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
    }

    const amountChange = (e) => {
        setAmount(e.target.value);
    }
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
                        schedInfo.id == 0 || schedInfo.id == null ? (
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
                                            }}>{schedInfo.collectables}</h1>
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
                                                amount == null || amount == 0 || amount == undefined ? (
                                                    <h1 style={{
                                                        marginTop: 25,
                                                        color: "white",
                                                        textShadow: '2px 2px 4px #00000059',
                                                    }}>{schedInfo.collectables}</h1>
                                                ) : (
                                                    <h1 style={{
                                                        marginTop: 25,
                                                        color: "white",
                                                        textShadow: '2px 2px 4px #00000059',
                                                    }}>{schedInfo.collectables - amount}</h1>
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
                                        <Button type="submit">Submit Payment</Button>
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

export default PaymentRegister;

//TODO: process payment and calculate patment