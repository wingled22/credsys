import React, { useEffect, useState } from "react";
import { Button, Modal, Table, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleHalfStroke, faClose, faEye, faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const LoanSchedulePaymentModal = ({ schedModalToggle, toggle, id, clientId }) => {
  const [schedules, setSchedules] = useState([]);
  const [loadingScheds, setLoadingScheds] = useState(true);

  const getLoanSchedule = async () => {
    try {
      const response = await fetch(`http://localhost:5034/api/Schedule/GetSchedulesByLoanId?id=${id}`);
      const data = await response.json();

      setSchedules(data);
      setLoadingScheds(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoadingScheds(false);
    }
  };

  useEffect(() => {
    getLoanSchedule();
  }, [id]);

  return (
    <Modal isOpen={schedModalToggle} toggle={toggle} size="lg" centered scrollable>
      <ModalHeader toggle={toggle}>Loan Schedules</ModalHeader>
      <ModalBody>
        {loadingScheds ? (
          <h4>Loading schedules</h4>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Collectables</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.collectables}</td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>
                    {item.status.toLowerCase() === "paid" ? (
                      <FontAwesomeIcon icon={faCheck} className="text-success" />
                    ) : item.status.toLowerCase() === "partial" ? (
                      <FontAwesomeIcon icon={faCircleHalfStroke} className="text-warning" />
                    ) : (
                      <FontAwesomeIcon icon={faClose} className="text-danger" />
                    )}
                  </td>
                  <td>
                    {item.status.toLowerCase() === "paid" ? (
                      <Button color="success" size="sm" className="mx-1">
                        <FontAwesomeIcon icon={faCheck} style={{ color: "whitesmoke" }} />
                      </Button>
                    ) : (
                      <Link to={`/admin/payment/paymentregister/${clientId}/${item.id}`}>
                        <Button size="sm" style={{ background: "#DFA248" }} className="mx-1">
                          <FontAwesomeIcon icon={faMoneyBill1Wave} style={{ color: "whitesmoke" }} />
                        </Button>
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </ModalBody>
      <ModalFooter></ModalFooter>
    </Modal>
  );
};

export default LoanSchedulePaymentModal;
