import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFileAlt, faMoneyBillTransfer, faPrint } from "@fortawesome/free-solid-svg-icons"
import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader, Table } from 'reactstrap';
const TransactionModal = ({viewTrasactionViewModalIsOpen, toggleTransactionsModal, loanId}) => {

    const [loading, setLoading] = useState(true);
    const [trans, setTrans] = useState([])

    const getTrans = async () => {
        try {
            const response = await fetch("http://localhost:5034/api/Transaction/GetTransactions?loanId=" + loanId);
            const data = await response.json();
           
            setTrans(data)
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    }

    // console.table(schedules);

    useEffect(() => {
        getTrans();
    }, [loanId])


    return (
        <Modal isOpen={viewTrasactionViewModalIsOpen} toggle={toggleTransactionsModal} size="lg" centered scrollable >
            <ModalHeader toggle={toggleTransactionsModal}>View Transactions</ModalHeader>
            <ModalBody>
                {
                    loading ? (
                        <h4>Loading transactions</h4>
                    ) : (
                        <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {trans.map((item) => (
                                    <tr key={item.transId}>
                                        <td>{item.transId}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.paymentDate}</td>
                                        <td>
                                            <Button
                                                color="success"
                                                size="sm"
                                                className="mx-1"
                                            >
                                                <FontAwesomeIcon icon={faPrint} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
                }
            </ModalBody>
        </Modal>
    );
}

export default TransactionModal;