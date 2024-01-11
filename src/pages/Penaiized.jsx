import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row, Table } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingUsd, faPlus } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';


const Penalized = () => {

    const [pastDueLoans, setPastDueLoans] = useState({});
    const [loading, setLoading] = useState(true);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const toggle = () => setModal(!modal);

    const getPastDueLoans = async () => {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/Loan/GetPenalizedLoan`);
        const data = await response.json();
        setPastDueLoans(data);
        setLoading(false);
    }


    useState(() => {
        getPastDueLoans();
    }, [pastDueLoans]);
    return (
        <Col
            style={{
                background: "whitesmoke",
                minWidth: 400,
                borderRadius: 30,
                padding: 30
            }}
        >
            <h3>Penalized loans</h3>

            <Link to="/penalty" className=''>
                <Button
                    color='warning'
                    style={{}}
                >
                    Back to past due loans
                </Button>
            </Link>

            <Table striped size="sm" className='mt-3'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>LoanType</th>
                        <th>Due Date</th>
                        <th>Collectables</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading ? (
                            <tr>
                                <td colSpan={4}>
                                    <p>Loading...</p>
                                </td>
                            </tr>
                        ) : (
                            pastDueLoans.map((rowData) => (
                                <tr key={rowData.id}>
                                    <td>{rowData.client.name}</td>
                                    <td>{rowData.type}</td>
                                    <td>{`${months[new Date(rowData.dueDate).getMonth()]} ${new Date(rowData.dueDate).getDate()}, ${new Date(rowData.dueDate).getFullYear()}`}</td>
                                    <td>{(rowData.loanAmount - rowData.collected) + rowData.totalPenalty}</td>
                                    <td>
                                        <Link to={`/admin/penalized/paymentregister/${rowData.clientId}/${rowData.id}`}>
                                            <Button
                                                color='warning'
                                                size='sm'
                                                className="mx-1"
                                            >
                                                <FontAwesomeIcon icon={faHandHoldingUsd} color='whitesmoke' />
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </Table>

        </Col>
    );
}

export default Penalized;