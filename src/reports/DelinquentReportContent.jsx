import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { Button, Table } from 'reactstrap';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass1, faLeftLong, faPrint, faUser, faUsers } from "@fortawesome/free-solid-svg-icons"

const DelinquentReportContent = ({ data, from, to }) => {

    const componentRef = useRef();

    return (
        <>
            <ReactToPrint
                trigger={() => <Button color='success' className='mx-1'>
                    <FontAwesomeIcon icon={faPrint} />
                </Button>}
                content={() => componentRef.current} />
                <div ref={componentRef} style={{ padding: 20 }}>
                <center>
                    <h5>Insurance Results</h5>
                    <p>From : {new Date(from).toDateString()}  - To : {new Date(to).toDateString()}</p>

                </center>
                <Table striped bordered responsive>
                    <thead>
                        <tr>
                            <th>Client ID</th>
                            <th>Client Name</th>
                            <th>Total Payments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((client) => (
                            <React.Fragment key={client.clientId}>
                                <tr>
                                    <td>{client.clientId}</td>
                                    <td>{client.clientName}</td>
                                    <td>{client.totalPayments.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td colSpan="3">
                                        <Table striped bordered responsive>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Type</th>
                                                    <th>Status</th>
                                                    <th>Due Date</th>
                                                    {/* Add more headers if needed */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {client.pastDueLoans.map((loan) => (
                                                    <tr key={loan.id}>
                                                        <td>{loan.id}</td>
                                                        <td>{loan.type}</td>
                                                        <td>{loan.status}</td>
                                                        <td>{loan.dueDate}</td>
                                                        {/* Add more columns if needed */}
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
    );
};

export default DelinquentReportContent;
