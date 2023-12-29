import React, { useEffect, useState } from "react"
import { Button, ButtonGroup, Modal, Table, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faMoneyBill1Wave, faMoneyBillTransfer, faMoneyCheck } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";

const LoanSchedulePaymentModal = ({ schedModalToggle, toggle, id, clientId }) => {

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
    }, [])


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
                                        <td>{item.date}</td>
                                        {/* <td>{item.status}</td> */}
                                        <td>
                                            {
                                                item.status.toLowerCase() == "paid" ? (
                                                    <Button
                                                        color="success"
                                                        size="sm"
                                                        //style={{marginRight: 10}}
                                                        className="mx-1"
                                                    >
                                                        <FontAwesomeIcon icon={faCheck} style={{ color: "whitesmoke" }} />
                                                    </Button>
                                                ) : (
                                                    <Link to={`/payment/paymentregister/${clientId}/${item.id}`}>
                                                        <Button
                                                            // color="warning"
                                                            size="sm"
                                                            style={{ background: "#DFA248" }}
                                                            className="mx-1"
                                                        >
                                                            <FontAwesomeIcon icon={faMoneyBill1Wave} style={{ color: "whitesmoke" }} />
                                                        </Button>
                                                    </Link>
                                                )
                                            }
                                        </td>
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

export default LoanSchedulePaymentModal