import React, { useState } from "react";

import { Button } from "reactstrap";
import LoanAndClientCreationModal from "./LoanAndClientCreationModal.jsx";


import "./Clients.css"
import "./dash.css";

export default function Clients() {
    const [modalOpen, setModalOpen] = useState(true);

    const toggleModal = (event) => {
        event.stopPropagation();
        setModalOpen(!modalOpen);
    };

    

    return (
        <div className="dash clients">
            <h1>Clients</h1>
            <Button className="register-client" onClick={toggleModal}>Register</Button>

            <LoanAndClientCreationModal  isOpen={modalOpen} toggleModal={toggleModal} />


        </div>
    );
}