import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import toastr from 'toastr';
import ReactToPrint from 'react-to-print';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass1, faLeftLong, faPrint, faUser, faUsers } from "@fortawesome/free-solid-svg-icons"


import "../pages/Clients.css";
import "../pages/dash.css";

const ReportInsurance = () => {

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
                `${import.meta.env.VITE_REACT_APP_API_URL}/api/Reports/GetDeductionInsurances`,
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

    return (
        <Col style={{
            background: "whitesmoke",
            minWidth: 400,
            borderRadius: 30,
            padding: 30
        }}>
            <div className="overflow-auto client-table-container" style={{ margin: 20, height: "90%" }}>
                <h2>Insurance Report</h2>
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
                {
                    loading ? (
                        <h1>Waiting for data</h1>
                    ) : (

                        <>
                            <h5>Results </h5>

                            <ReactToPrint
                                trigger={() =>
                                    <Button color='success' className='mx-1' >
                                        <FontAwesomeIcon icon={faPrint} />
                                    </Button>
                                }
                                content={() => componentRef.current}
                            />
                            <div ref={componentRef} style={{ padding: 20 }}>
                                <center>
                                    <h5>Insurance Results</h5>
                                    <p>From : {new Date(from).toDateString()}  - To : {new Date(to).toDateString()}</p>

                                </center>

                                <Table striped  >
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Loan ID</th>
                                            <th>Total CBU</th>
                                            <th>Date Added</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportData.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.loanId}</td>
                                                <td>{item.totalInsurance}</td>
                                                <td>{new Date(item.dateAdded).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                      
                                    </tbody>
                                </Table>
                            </div>
                        </>
                    )

                }
            </div>
        </Col>


    );
}

export default ReportInsurance;