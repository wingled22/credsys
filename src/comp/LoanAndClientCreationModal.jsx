import React from "react";
import "./LoanAndClientCreationModal.css";
import MultiStepForm from "./MultiStepForm.jsx"



export default function LoanAndClientCreationModal({ isOpen, toggleModal}){
    const handleStepClick = () => {
        // Additional actions when a step is clicked, if needed
      };
    
    return (
        <>
            {isOpen && (
                <div onClick={toggleModal} className="modal-overlay">
                    <div className="modal-card">
                        <MultiStepForm onStepClick={handleStepClick} toggleModal={toggleModal}/>

                    </div>
                </div>
            )}
        </>
    );
}