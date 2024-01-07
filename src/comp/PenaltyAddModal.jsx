import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader, Form, Row, Col, FormGroup, Label, Input, Container } from 'reactstrap';

const PenaltyAddModal = ({modal, toggle, id}) => {

    const [penalty, setPenalty] = useState();

    useEffect(()=> {
        console.log(id);
    },[id]);

    const submitHandler = (e) =>{
        e.preventDefault();
    };

    return ( 

        <Modal isOpen={modal} toggle={toggle} centered  >
                <ModalHeader toggle={toggle} >
                   Add penalty
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e)=> {
                        submitHandler(e)
                    }}>
                        <Row>
                            <Col md={12} >
                                <FormGroup>
                                    <Label>Penalty to add</Label>
                                    <Input
                                        name='penalty'
                                        value={penalty}
                                        onChange={(e)=> {
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