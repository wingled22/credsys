import React, { useEffect, useState } from "react"
import { Button, ButtonGroup, Modal, Table, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import LoanScheduleModal from "./LoanScheduleModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFileAlt, faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons"
import NewClientLoan from "./NewClientLoan";
import { Link } from "react-router-dom";
import TransactionModal from "./TransactionModal";


const TableClientAccordionItemDetail = ({ id, name }) => {
    const [loans, setLoans] = useState([]);
    const [loadingLoans, setLoadingLoans] = useState(true);
    const [schedules, setSchedules] = useState([]);
    const [loadingScheds, setLoadingScheds] = useState(true);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [selectedLoanForTrans, setSelectedLoanForTrans] = useState(null);


    //modal states
    const [newClientLoanModalIsOpen, setNewClientLoanModalIsOpen] = useState(false);
    const [schedModalToggle, setSchedModalToggle] = useState(false);
    const [viewTrasactionViewModalIsOpen, setViewTransactionModalIsOpen] = useState(false);


    //toggles
    const toggleCreateNewLoanModal = () => setNewClientLoanModalIsOpen(!newClientLoanModalIsOpen);
    const toggle = () => setSchedModalToggle(!schedModalToggle);
    const toggleTransactionsModal = () => setViewTransactionModalIsOpen(!viewTrasactionViewModalIsOpen);



    const renderNewLoanModal = () => {
        return <NewClientLoan modal={newClientLoanModalIsOpen} toggle={toggleCreateNewLoanModal} clientId={id} onLoanSubmitted={onLoanSubmitted} />;
    }



    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5034/api/client/GetClientLoans?id=" + id);
            const data = await response.json();
            // setLoans((prevLoans) =>{
            //     return [...prevLoans, data]
            // });
            setLoans(data)
            setLoadingLoans(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoadingLoans(false);
        }
    }

    const fetchAndSetLoans = async () => {
        try {
            const response = await fetch(`http://localhost:5034/api/client/GetClientLoans?id=${id}`);
            const data = await response.json();
            setLoans(data);
            setLoadingLoans(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoadingLoans(false);
        }
    };

    const onLoanSubmitted = () => {
        fetchAndSetLoans();
    };


    useEffect(() => {
        fetchData();
    }, [])

    const getLoanSchedule = async (loanId) => {
        try {
            const response = await fetch(`http://localhost:5034/api/Schedule/GetSchedulesByLoanId?id=${loanId}`);
            const data = await response.json();
            setSchedules(data);
            setLoadingScheds(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoadingScheds(false);
        }
    };


    const isPenalized = (collected, totalAmount, penalty) => {

        if ((totalAmount + penalty) - collected == 0) {
            return "Paid"
        } else {
            return "Penalized"
        }

    }





    return (
        <>
            <tr key={`details-${id}`} style={{ margin: 50 }}>
                <td colSpan="4">
                    <div
                        className="details-container"
                        style={{ padding: 20 }}
                    >
                        Loan Details
                        <br />
                        <Button
                            size="sm"
                            className="mt-1 mb-2"
                            onClick={() => toggleCreateNewLoanModal(onLoanSubmitted)}
                            style={{ background: "#DFA248", color: "whitesmoke", border: "none" }}
                        >
                            Add Loan
                        </Button>

                        {renderNewLoanModal()}

                        {loadingLoans ? (
                            <h1>loading</h1>
                        ) : (
                            <Table bordered striped size="sm">
                                <thead>
                                    <tr>
                                        <th>id</th>

                                        <th>Type</th>

                                        {/* <th>Capital</th>
                                        <th>Interest</th>
                                        <th>Interest Amount</th>
                                        <th>Loan Receivable</th> */}
                                        <th>No Payment</th>
                                        <th>Total Payable</th>
                                        <th>Collected</th>
                                        <th>Collectables</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loans.map((loanData) => {
                                        return (
                                            <tr key={`loanID-${loanData.id}`}>
                                                <td>{loanData.id}</td>
                                                <td>{loanData.type}</td>
                                                {/* <td>{loanData.capital}</td>
                                                <td>{loanData.interest}</td>
                                                <td>{loanData.interestedAmount}</td>
                                                <td>{loanData.loanReceivable}</td> */}
                                                <td>{loanData.noPayment}</td>
                                                <td>{loanData.loanAmount}</td>
                                                <td>{loanData.collected}</td>
                                                <td>{loanData.loanAmount + loanData.totalPenalty - loanData.collected}</td>
                                                <td>{loanData.status}</td>

                                                <td>
                                                    <Button
                                                        color="info"
                                                        size="sm"
                                                        //style={{marginRight: 10}}
                                                        className="mx-1"
                                                        onClick={() => {
                                                            setSelectedLoan(loanData.id);
                                                            toggle();
                                                            getLoanSchedule(loanData.id);
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </Button>
                                                    <Link to={`/admin/reports/promisory/${loanData.id}`}>
                                                        <Button
                                                            color="success"
                                                            size="sm"
                                                            className="mx-1"

                                                        >
                                                            <FontAwesomeIcon icon={faFileAlt} />
                                                        </Button>
                                                    </Link>

                                                    {
                                                        loanData.collected > 0 && (
                                                            <Button color="success"
                                                                size="sm"
                                                                className="mx-1"
                                                                onClick={() => {
                                                                    setSelectedLoanForTrans(loanData.id)
                                                                    toggleTransactionsModal();
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faMoneyBillTransfer} />
                                                            </Button>
                                                        )
                                                    }


                                                </td>
                                             
                                            </tr>



                                        );
                                    })}
                                </tbody>
                            </Table>
                        )}

                        {selectedLoan !== null && (
                            <LoanScheduleModal schedModalToggle={schedModalToggle} toggle={toggle} id={selectedLoan} />
                        )}

                        {selectedLoanForTrans !== null && (
                            <TransactionModal viewTrasactionViewModalIsOpen={viewTrasactionViewModalIsOpen} toggleTransactionsModal={toggleTransactionsModal} loanId={selectedLoanForTrans} />
                        )}
                    </div>
                </td>
            </tr>
        </>
    )
}

export default TableClientAccordionItemDetail