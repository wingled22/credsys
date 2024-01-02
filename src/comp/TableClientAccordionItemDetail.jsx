import React, { useEffect, useState } from "react"
import { Button, ButtonGroup, Modal, Table, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import LoanScheduleModal from "./LoanScheduleModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons"
import NewClientLoan from "./NewClientLoan";


const TableClientAccordionItemDetail = ({ id, name }) => {
    const [loans, setLoans] = useState([]);
    const [loadingLoans, setLoadingLoans] = useState(true);
    const [schedules, setSchedules] = useState([]);
    const [loadingScheds, setLoadingScheds] = useState(true);
    const [schedModalToggle, setSchedModalToggle] = useState(false);
    const [newClientLoanModalIsOpen, setNewClientLoanModalIsOpen] = useState(false);

    const toggleCreateNewLoanModal = () => setNewClientLoanModalIsOpen(!newClientLoanModalIsOpen);

    const renderNewLoanModal = () => {
        return <NewClientLoan modal={newClientLoanModalIsOpen} toggle={toggleCreateNewLoanModal} clientId={id} onLoanSubmitted={onLoanSubmitted} />;
    }
    const toggle = () => setSchedModalToggle(!schedModalToggle);



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

    const getLoanSchedule = async () => {
        try {
            const response = await fetch("http://localhost:5034/api/client/GetClientLoans?id=" + id);
            const data = await response.json();
            // setLoans((prevLoans) =>{
            //     return [...prevLoans, data]
            // });
            setSchedules(data)
            setLoadingScheds(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoadingScheds(false);
        }
    }

    const renderScheduleModal = () => {
        return (
            <LoanScheduleModal schedModalToggle={schedModalToggle} toggle={toggle} />
        )
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
                                                <td>{loanData.type}</td>
                                                {/* <td>{loanData.capital}</td>
                                                <td>{loanData.interest}</td>
                                                <td>{loanData.interestedAmount}</td>
                                                <td>{loanData.loanReceivable}</td> */}
                                                <td>{loanData.noPayment}</td>
                                                <td>{loanData.loanAmount}</td>
                                                <td>{loanData.collected}</td>
                                                <td>{loanData.loanAmount - loanData.collected}</td>
                                                <td>{loanData.status}</td>

                                                <td>
                                                    <Button
                                                        color="info"
                                                        size="sm"
                                                        //style={{marginRight: 10}}
                                                        className="mx-1"
                                                        onClick={() => toggle()}
                                                    >
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </Button>
                                                    {/* <Button
                                                        color="success"
                                                        size="sm"
                                                    >
                                                        View info
                                                    </Button> */}
                                                </td>
                                                <LoanScheduleModal schedModalToggle={schedModalToggle} toggle={toggle} id={loanData.id} />
                                            </tr>



                                        );
                                    })}
                                </tbody>
                            </Table>
                        )}
                    </div>
                </td>
            </tr>
        </>
    )
}

export default TableClientAccordionItemDetail