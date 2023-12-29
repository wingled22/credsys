import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";



const PaymentRegister = () => {

    const { clientId, scheduleId } = useParams();
    const [loans, setLoans] = useState([]);
    const [clientInfo, setClientInfo] = useState({});

    const fetchClientInfoData = async () => {
        try {
            const response = await fetch("http://localhost:5034/api/client/GetClientById?id=" + clientId);
            const data = await response.json();

            setClientInfo(data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchClientInfoData();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <Container className='container-fluid' style={{
            // background: "whitesmoke",
            // minWidth: 400,
            // borderRadius: 30,
            padding: 30,
            boxSizing: "border-box"
        }}>
            {/* <Link to={"/payment"}>back to payment</Link> */}

            <Row className='d-flex justify-content-between' style={{alignItems: "flex-start",rowGap:10, columnGap: 10}}>
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
                    <div className="d-flex flex-wrap justify-content-around">
                        <div style={{
                            background: "#DFA248",
                            height: 150,
                            width: 150,
                            padding: 10,
                            borderRadius: 10
                        }}>
                            <center style={{ color: "whitesmoke" }}>
                                Payable

                            </center>
                        </div>

                        <div style={{
                            background: "#DFA248",
                            height: 150,
                            width: 150,
                            padding: 10,
                            borderRadius: 10
                        }}>
                            <center style={{ color: "whitesmoke" }}>
                                Remaining

                            </center>
                        </div>
                        <br />

                    </div>
                    <br />
                    <Form onSubmit={submitHandler}>
                        <FormGroup>
                            <Label>Amount to pay</Label>
                            <Input 
                                type="number"
                                required
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit">Submit Payment</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default PaymentRegister;

//TODO: process payment and calculate patment