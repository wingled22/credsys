import React from "react";
import "./LoanAndClientCreationModal.css";
import MultiStepForm from "./MultiStepForm.jsx"
import {Modal, Table, ModalHeader, ModalBody, ModalFooter} from "reactstrap"

export default function LoanAndClientCreationModal({ isOpen, toggleModal }) {
    const handleStepClick = () => {
        // Additional actions when a step is clicked, if needed
    };

    const handleFormFinish = () => {
        // Additional actions when the form is successfully submitted, if needed
    };


    return (
        <>
            {/* {isOpen && (
                <div onClick={toggleModal} className="modal-overlay">
                    <div className="modal-card">
                        <MultiStepForm onStepClick={handleStepClick} toggleModal={toggleModal} onFinish={handleFormFinish} />

                    </div>
                </div>
            )} */}

            <Modal isOpen={isOpen} toggle={toggleModal} size="lg" centered scrollable  >
                <ModalBody>
                        <MultiStepForm onStepClick={handleStepClick} toggleModal={toggleModal} onFinish={handleFormFinish} />
                </ModalBody>
                {/* <ModalFooter></ModalFooter> */}
            </Modal>
        </>
    );
}