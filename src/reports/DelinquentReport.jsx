import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import toastr from 'toastr';
import ReactToPrint from 'react-to-print';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass1, faLeftLong, faPrint, faUser, faUsers } from "@fortawesome/free-solid-svg-icons"
import DelinquentReportContent from './DelinquentReportContent';



const DelinquentReport = () => {

    const [reportData, setReportData] = useState([])
    const [loading, setLoading] = useState(true);
    const componentRef = useRef();
    const subtractDays = (date, days) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - days);
        return newDate;
    };

    const [from, setFrom] = useState(subtractDays(new Date(), 1));
    const [to, setTo] = useState(new Date);


    const toInputChange = (e) => {
        const { name, value, type } = e.target;

        setFrom(new Date(value));

    };

    const fromInputChange = (e) => {
        const { name, value, type } = e.target;

        setFrom(new Date(value));

    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {

            const formData = {
                startDate: from.toISOString(),
                endDate: to.toISOString(),
            };

            console.log(formData);

            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_API_URL}/api/Reports/GetDelinquentReport`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                toastr.error("Something unexpected happen when adding loan.", "Unsuccessful on adding loan")
                throw new Error('Failed to submit the form');

            }

            const responseData = await response.json();
            setReportData(responseData);
            setLoading(false);
            toastr.success("Successfully added the new loan", "Success")
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }

    }

    useEffect(()=>{

    },[reportData]);


    const jsonData = [
        {
            "clientId": 12,
            "clientName": "Crispoin",
            "totalPayments": 0.00,
            "pastDueLoans": [
                {
                    "id": 33,
                    "clientId": 12,
                    "type": "Daily",
                    "deductCbu": 100.00,
                    "deductInsurance": 100.00,
                    "loanAmount": 6540.00,
                    "capital": 6000.00,
                    "interest": 9.00,
                    "interestedAmount": 540.00,
                    "loanReceivable": 5500.00,
                    "noPayment": 60,
                    "status": "Unpaid",
                    "dueDate": "2022-10-15T00:00:00",
                    "totalPenalty": 0.00,
                    "addedInterest": null,
                    "otherFee": 300.00,
                    "dateTime": "2022-08-16T00:00:00"
                }
            ]
        },
        {
            "clientId": 13,
            "clientName": "Sample Client 12",
            "totalPayments": 2200.00,
            "pastDueLoans": [
                {
                    "id": 12,
                    "clientId": 13,
                    "type": "Emergency",
                    "deductCbu": 100.00,
                    "deductInsurance": 100.00,
                    "loanAmount": 5500.00,
                    "capital": 5000.00,
                    "interest": 10.00,
                    "interestedAmount": 500.00,
                    "loanReceivable": 4700.00,
                    "noPayment": 1,
                    "status": "Unpaid",
                    "dueDate": "2024-01-09T18:47:52",
                    "totalPenalty": 0.00,
                    "addedInterest": null,
                    "otherFee": 100.00,
                    "dateTime": "2024-01-02T18:47:52"
                },
                {
                    "id": 34,
                    "clientId": 13,
                    "type": "PO Cash",
                    "deductCbu": 100.00,
                    "deductInsurance": 100.00,
                    "loanAmount": 8800.00,
                    "capital": 10000.00,
                    "interest": 10.00,
                    "interestedAmount": 1000.00,
                    "loanReceivable": 9700.00,
                    "noPayment": 5,
                    "status": "Unpaid",
                    "dueDate": "2021-03-26T00:00:00",
                    "totalPenalty": 0.00,
                    "addedInterest": null,
                    "otherFee": 100.00,
                    "dateTime": "2021-01-10T00:00:00"
                }
            ]
        },
        {
            "clientId": 14,
            "clientName": "Shaq Manolo",
            "totalPayments": 0.00,
            "pastDueLoans": [
                {
                    "id": 11,
                    "clientId": 14,
                    "type": "Emergency",
                    "deductCbu": 100.00,
                    "deductInsurance": 100.00,
                    "loanAmount": 1010.00,
                    "capital": 1000.00,
                    "interest": 1.00,
                    "interestedAmount": 10.00,
                    "loanReceivable": 700.00,
                    "noPayment": 1,
                    "status": "Unpaid",
                    "dueDate": "2024-01-09T17:37:55",
                    "totalPenalty": 0.00,
                    "addedInterest": null,
                    "otherFee": 100.00,
                    "dateTime": "2024-01-02T17:37:55"
                }
            ]
        }
    ];

    return (
        <Col style={{
            background: "whitesmoke",
            minWidth: 400,
            borderRadius: 30,
            padding: 30
        }}>
            <div className="overflow-auto client-table-container" style={{ margin: 20, height: "90%" }}>

                <h2>Delinquent Report</h2>
                <Form onSubmit={submitHandler}>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label>From</Label>
                                <Input
                                    type='date'
                                    value={from.toISOString().split('T')[0]}
                                    onChange={toInputChange}
                                />

                            </FormGroup>
                        </Col>

                        <Col md={6}>
                            <FormGroup>
                                <Label>To</Label>
                                <Input
                                    type='date'
                                    value={to.toISOString().split('T')[0]}
                                    onChange={fromInputChange}


                                />

                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Button style={{ background: "#DFA248" }} type='submit'>
                            Submit
                        </Button>
                    </Row>
                </Form>
                <hr />

                {loading ? (
                    <h1>Waiting for data</h1>
                ) : (

                    <>

                        <DelinquentReportContent data={reportData} from={from} to={to} />

                    </>
                )}
            </div>

        </Col>
    );
}

export default DelinquentReport;