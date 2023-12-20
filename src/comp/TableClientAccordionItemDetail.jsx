import React, { useEffect, useState } from "react"
import { Button, ButtonGroup, Modal, Table, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


const TableClientAccordionItemDetail = ({ id, name }) => {
    const [loans, setLoans] = useState([]);
    const [loadingLoans, setLoadingLoans] = useState(true);
    const [schedules, setSchedules] = useState([]);
    const [loadingScheds, setLoadingScheds] = useState(true);

    const [schedModalToggle, setSchedModalToggle] = useState(false);
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
            <Modal isOpen={schedModalToggle} toggle={toggle} {...args}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        Do Something
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

    return (
        <>
            <Modal isOpen={schedModalToggle} toggle={toggle} size="lg" centered >
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </ModalBody>
                <ModalFooter></ModalFooter>
            </Modal>

            <tr key={`details-${id}`} style={{ margin: 50 }}>
                <td colSpan="4">
                    <div
                        className="details-container"
                        style={{ padding: 20 }}
                    >
                        Loan Details

                        {loadingLoans ? (
                            <h1>loading</h1>
                        ) : (
                            <Table bordered striped size="sm">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Total Payable</th>
                                        <th>Capital</th>
                                        <th>Interest</th>
                                        <th>Interest Amount</th>
                                        <th>Loan Receivable</th>
                                        <th>No Payment</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loans.map((loanData) => {
                                        return (
                                            <tr key={`loanID-${loanData.id}`}>
                                                <td>{loanData.type}</td>
                                                <td>{loanData.loanAmount}</td>
                                                <td>{loanData.capital}</td>
                                                <td>{loanData.interest}</td>
                                                <td>{loanData.interestedAmount}</td>
                                                <td>{loanData.loanReceivable}</td>
                                                <td>{loanData.noPayment}</td>
                                                <td>
                                                    <Button
                                                        color="info"
                                                        size="sm"
                                                        //style={{marginRight: 10}}
                                                        className="mx-1"
                                                        onClick={() => toggle()}
                                                    >
                                                        View info
                                                    </Button>
                                                    <Button
                                                        color="success"
                                                        size="sm"
                                                    >
                                                        View info
                                                    </Button>
                                                </td>
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