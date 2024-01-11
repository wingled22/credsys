import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button, Card, CardBody, CardText, CardTitle, Col, Container, } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faDollar, faExchangeAlt, faExclamationCircle, faHourglass1, faLeftLong, faMapMarkedAlt, faMoneyBillTransfer, faPrint, faUser, faUsers } from "@fortawesome/free-solid-svg-icons"

import "./Reports.css"

const Reports = () => {
    return (
        <Col style={{
            background: "whitesmoke",
            minWidth: 400,
            borderRadius: 30,
            padding: 30
        }}>
            <h5>Reports</h5>

            <div className="overflow-auto client-table-container d-flex flex-wrap justify-content-around" style={{ margin: 20, height: "90%" }}  >
                <Link to={'/admin/reports/cbu'} style={{ textDecoration: "none" }}>
                    <Card
                        style={{
                            width: '15rem',
                            color: "whitesmoke",
                            background: "#30b4b4"
                        }}
                        className='mx-3 my-4'
                    >
                        <CardBody>
                            <CardTitle tag="h5">

                                <FontAwesomeIcon icon={faDollar} size='2x' className='mx-2' />
                                CBU Report
                            </CardTitle>

                            <CardText>
                                Get all the CBU Deductions from loan filterable by date
                            </CardText>

                        </CardBody>
                    </Card>
                </Link>
                <Link to={'/admin/reports/insurance'} style={{ textDecoration: "none" }}>
                    <Card
                        style={{
                            width: '15rem',
                            color: "whitesmoke",
                            background: "#3069b4"
                        }}
                        className='mx-3 my-4'
                    >
                        <CardBody>
                            <CardTitle tag="h5">

                                <FontAwesomeIcon icon={faDollar} size='2x' className='mx-2' />
                                Insurance Report
                            </CardTitle>

                            <CardText>
                                Get insurance from loan filterable by date
                            </CardText>

                        </CardBody>
                    </Card>
                </Link>

                <Link to={'/admin/reports/remittance'} style={{ textDecoration: "none" }}>
                    <Card
                        style={{
                            width: '15rem',
                            color: "whitesmoke",
                            background: "#b47830"
                        }}
                        className='mx-3 my-4'
                    >
                        <CardBody>
                            <CardTitle tag="h5">

                                <FontAwesomeIcon icon={faExchangeAlt} size='2x' className='mx-2' />
                                Remittance
                            </CardTitle>

                            <CardText>
                                Liquidate the collection from the bills collected
                            </CardText>

                        </CardBody>
                    </Card>
                </Link>

                <Link to={'/admin/reports/ItineraryReport'}>
                    <Card
                        style={{
                            width: '15rem',
                            color: "whitesmoke",
                            background: "#cb5247"
                        }}
                        className='mx-3 my-4'
                    >
                        <CardBody>
                            <CardTitle tag="h5">

                                <FontAwesomeIcon icon={faMapMarkedAlt} size='2x' className='mx-2' />
                                Itinerary Report
                            </CardTitle>

                            <CardText>
                                Get what to collect by date
                            </CardText>

                        </CardBody>
                    </Card>
                </Link>
                <Link to={"/admin/reports/delinquent"} style={{ textDecoration: "none" }} >
                    <Card
                        style={{
                            width: '15rem',
                            color: "whitesmoke",
                            background: "#588e1f"
                        }}
                        className='mx-3 my-4'
                    >
                        <CardBody>
                            <CardTitle tag="h5">

                                <FontAwesomeIcon icon={faExclamationCircle} size='2x' className='mx-2' />
                                Delinquents
                            </CardTitle>

                            <CardText>
                                get all past due loans filterable by date
                            </CardText>

                        </CardBody>
                    </Card>
                </Link>

                <Link to={"/admin/reports/transaction"} style={{ textDecoration: "none" }} >
                    <Card
                        style={{
                            width: '15rem',
                            color: "whitesmoke",
                            background: "#588e1f"
                        }}
                        className='mx-3 my-4'
                    >
                        <CardBody>
                            <CardTitle tag="h5">

                                <FontAwesomeIcon icon={faMoneyBillTransfer} size='2x' className='mx-2' />
                                Transactions
                            </CardTitle>

                            <CardText>
                                get transactions
                            </CardText>

                        </CardBody>
                    </Card>
                </Link>
            </div >



            <Outlet />
        </Col>
    );
}

export default Reports;