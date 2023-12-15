import React, { useState } from "react";

import { Button, ButtonGroup, Table } from "reactstrap";
import LoanAndClientCreationModal from "../comp/LoanAndClientCreationModal.jsx";


import "./Clients.css";
import "./dash.css";
import TableAccordion from "../comp/TableClientAccordion.jsx";

export default function Clients() {
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = (event) => {
        if (event) {
            event.stopPropagation();
        }
        setModalOpen(!modalOpen);
    };



    return (
        <div className="dash clients">
            <h1>Clients</h1>
            <Button className="register-client" onClick={toggleModal}>Register</Button>
            <LoanAndClientCreationModal isOpen={modalOpen} toggleModal={toggleModal} />

            <TableAccordion/>

        </div>
    );
}