import React, { useEffect, useState } from "react"
import { Button, ButtonGroup, Modal, Table, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const LoanScheduleModal = ({ schedModalToggle, toggle, id }) => {

    const [schedules, setSchedules] = useState([]);
    const [loadingScheds, setLoadingScheds] = useState(true);

    const getLoanSchedule = async () => {
        try {
            const response = await fetch("http://localhost:5034/api/Schedule/GetSchedulesByLoanId?id=" + id);
            const data = await response.json();
           
            setSchedules(data)
            setLoadingScheds(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoadingScheds(false);
        }
    }

    // console.table(schedules);

    useEffect(() => {
        getLoanSchedule();
    }, [id])


    return (
        <Modal isOpen={schedModalToggle} toggle={toggle} size="lg" centered scrollable  >
            <ModalHeader toggle={toggle}>Loan Schedules</ModalHeader>
            <ModalBody>
                {
                    loadingScheds ? (
                        <h4>Loading schedules</h4>
                    ) : (
                        <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Collectables</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedules.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.collectables}</td>
                                        <td>{new Date(item.date).toLocaleDateString()}</td>
                                        <td>{item.status}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
                }
            </ModalBody>
            <ModalFooter></ModalFooter>
        </Modal>
    )
}

export default LoanScheduleModal