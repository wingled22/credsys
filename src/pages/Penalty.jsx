import React, { useState } from 'react';
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row, Table } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFileAlt, faPlus } from "@fortawesome/free-solid-svg-icons"
import PenaltyAddModal from '../comp/PenaltyAddModal';
import { Link } from 'react-router-dom';


const Penalty = () => {

    const [pastDueLoans, setPastDueLoans] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedLoan, setSelectedLoan] = useState();
    const [modal, setModal] = useState(false);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const toggle = () => setModal(!modal);

    const getPastDueLoans = async () => {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/Loan/GetPastDueLoans`);
        const data = await response.json();
        setPastDueLoans(data);
        setLoading(false);
    }

    const onPenaltySubmitted = () => {
        getPastDueLoans();
    }

    useState(() => {
        getPastDueLoans();
    }, [pastDueLoans]);

    return (
        <>

            <Col style={{
                background: "whitesmoke",
                minWidth: 400,
                borderRadius: 30,
                padding: 30
            }}>
                <h3>Past-Due Loans</h3>

                <Link to="/admin/penalized" className=''>
                    <Button 
                        color='warning'
                        style={{}}
                    >
                        Go to penalized loan
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
                                        <td>{rowData.loanAmount - rowData.collected}</td>
                                        <td>
                                            <Button
                                                color='warning'
                                                size='sm'
                                                className="mx-1"
                                                onClick={() => {
                                                    toggle();
                                                    setSelectedLoan(rowData.id)
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faPlus} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </Table>

            </Col>
            {selectedLoan !== null && (
                <PenaltyAddModal modal={modal} toggle={toggle} id={selectedLoan} onPenaltySubmitted={onPenaltySubmitted} />
            )}

        </>
    );
}

export default Penalty;