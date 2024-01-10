import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import toastr from 'toastr';
import ReactToPrint from 'react-to-print';


import province from "../src/comp/address/province.json";
import city from "../src/comp/address/city.json";
import barangay from "../src/comp/address/barangay.json";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass1, faLeftLong, faPrint, faUser, faUsers } from "@fortawesome/free-solid-svg-icons"



const ItineraryReport = () => {

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

            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/Loan/GetSchedulesByDate?date=${from.toISOString()}`);

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

    useEffect(() => {

    }, [reportData]);



    return (

        <Col style={{
            background: "whitesmoke",
            minWidth: 400,
            borderRadius: 30,
            padding: 30
        }}>
            <div className="overflow-auto client-table-container" style={{ margin: 20, height: "90%" }}>
                <h5>Itinerary Reports</h5>

                <Form onSubmit={submitHandler}>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label>Date </Label>
                                <Input
                                    type='date'
                                    value={from.toISOString().split('T')[0]}
                                    onChange={toInputChange}
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

                {reportData == null ? null : (
                    <>
                        <ReactToPrint
                            trigger={() => <Button color='success' className='mx-1'>
                                <FontAwesomeIcon icon={faPrint} />
                            </Button>}
                            content={() => componentRef.current} />

                        <div ref={componentRef} style={{ padding: 20 }}>
                            <center>
                                <h3>Itinerary Report</h3>
                                <p>{from.toDateString()}</p>
                            </center>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Province</th>
                                        <th>City</th>
                                        <th>Barangay</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <tr>
                                                <td> {item.province == null
                                                    ? ""
                                                    : (province.find((t) => t.province_code === item.province) ||
                                                        {}).province_name}</td>
                                                <td>{item.city == null
                                                    ? ""
                                                    : (city.find((t) => t.city_code === item.city) ||
                                                        {}).city_name}</td>
                                                <td>{item.barangay == null
                                                    ? ""
                                                    : (barangay.find((t) => t.brgy_code === item.barangay) ||
                                                        {}).brgy_name + ", "}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}>
                                                    <Table bordered>
                                                        <thead>
                                                            <tr>
                                                                <th>Schedule ID</th>
                                                                <th>Client Name</th>
                                                                <th>Street Address</th>
                                                                 <th>Collectables</th>
                                                                <th>Status</th>
                                                               
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {item.schedules.map((schedule) => (
                                                                <tr key={schedule.scheduleId}>
                                                                    <td>{schedule.scheduleId}</td>
                                                                    <td>{schedule.clientName}</td>
                                                                    <td>{schedule.additionalAddressInfo}</td>
                                                                    <td>{schedule.collectables}</td>
                                                                    <td>{schedule.status}</td>
                                                                    
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </td>
                                            </tr>
                                        </React.Fragment>
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

export default ItineraryReport;