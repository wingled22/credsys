import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader, Form, Row, Col, FormGroup, Label, Input, Container } from 'reactstrap';
import toastr from 'toastr';

const PenaltyAddModal = ({ modal, toggle, id, onPenaltySubmitted }) => {

    const [penalty, setPenalty] = useState(0);

    useEffect(() => {
        console.log(id);
    }, [id]);

    const submitHandler = async (e) => {
        try {
            e.preventDefault();

            const formData = {
                loanId : id,
                amount : penalty
            };

            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_API_URL}/api/Loan/AddPenalty`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(formData)
                }
            );

            if(!response.ok){
                toastr.error("Error adding penalty", "Failed")
            }

            // const responseData = await response.json();

            if(onPenaltySubmitted){
                onPenaltySubmitted();
            }

            toggle();
            toastr.success("Successfully added penalty", "Success")
        } catch (error) {
            console.log(error)
        }
    };

    return (
        
        <Modal isOpen={modal} toggle={toggle} centered  >
            <ModalHeader toggle={toggle} >
                Add penalty
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={(e) => {
                    submitHandler(e)
                }}>
                    <Row>
                        <Col md={12} >
                            <FormGroup>
                                <Label>Penalty to add</Label>
                                <Input
                                    name='penalty'
                                    value={penalty}
                                    onChange={(e) => {
                                        setPenalty(e.target.value);
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Container className="text-center mt-4">
                        <button className="reg" type="submit">
                            Submit
                        </button>
                    </Container>
                </Form>

            </ModalBody>
        </Modal>
    );
}

export default PenaltyAddModal;