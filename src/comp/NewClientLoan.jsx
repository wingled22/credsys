import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Container, Form, Input, Row, Col, FormGroup, Label } from "reactstrap";
import toastr from "toastr";


const NewClientLoan = ({ modal, toggle, clientId, onLoanSubmitted }) => {
    const [formData, setFormData] = useState({
        clientId: clientId,
        loanType: '',
        capital: 0,
        interest: 0,
        noOfPayments: 0,
        deductCBU: 0,
        deductInsurance: 0,
        deductOther: 0,
        dateTime: new Date(),
    });
    const [totalBringHome, setTotalBringHome] = useState(0);
    const [interestedAmount, setInterestedAmount] = useState(0);


    useEffect(() => {
        calculateTotalBringHome();
    }, [formData])

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name == "dateTime") {
            // console.log("Datetime is changed")
            // console.log(value)
            setFormData((prevData) => ({
                ...prevData,
                [name]: new Date(value),
            }));
        } else {

            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }


    };

    const calculateTotalBringHome = () => {
        const { capital, interest, deductCBU, deductInsurance, deductOther } = formData;

        const totalDeductions = parseFloat(deductCBU) + parseFloat(deductInsurance) + parseFloat(deductOther);
        const intrst = capital * (parseFloat(interest) / 100);

        const totalBringHome = (parseFloat(capital) - intrst) - totalDeductions;

        setInterestedAmount(intrst);
        setTotalBringHome(totalBringHome);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5034/api/Client/PostClientLoan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                toastr.error("Something unexpected happen when adding loan.", "Unsuccessful on adding loan")
                throw new Error('Failed to submit the form');

            }

            const responseData = await response.json();
            console.log('Form submitted successfully:', responseData);

            // Call the callback function to notify that a loan has been submitted
            if (onLoanSubmitted) {
                onLoanSubmitted();
            }

            // Close the modal
            toggle();
            toastr.success("Successfully added the new loan", "Success")
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };

    console.table(formData);


    return (
        <React.Fragment>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Create Loan</ModalHeader>
                <ModalBody>
                    <Container>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label>Date loan created</Label>
                                        <Input
                                            required
                                            type="date"
                                            name="dateTime"
                                            // value={formData.dateTime}
                                            value={formData.dateTime.toISOString().split('T')[0]}
                                            onChange={handleInputChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Loan Type</Label>
                                        <Input
                                            type="select"
                                            name="loanType"
                                            value={formData.loanType}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="" disabled hidden>
                                                Select Loan Type
                                            </option>
                                            <option value="Daily">Daily</option>
                                            <option value="Emergency">Emergency</option>
                                            <option value="PO Cash">PO Cash</option>
                                            <option value="Others">Others</option>
                                        </Input>
                                    </FormGroup>
                                </Col>

                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Amount to borrow</Label>
                                        <Input
                                            required
                                            type="number"
                                            name="capital"
                                            value={formData.capital}
                                            onChange={handleInputChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Interest</Label>
                                        <Input
                                            required
                                            type="number"
                                            name="interest"
                                            value={formData.interest}
                                            onChange={handleInputChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>No of payments</Label>
                                        <Input
                                            required
                                            type="number"
                                            name="noOfPayments"
                                            value={formData.noOfPayments}
                                            onChange={handleInputChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <h6>Deductions</h6>
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label>CBU</Label>
                                        <Input
                                            required
                                            type="number"
                                            name="deductCBU"
                                            value={formData.deductCBU}
                                            onChange={handleInputChange}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={4}>
                                    <FormGroup>
                                        <Label>Insurance</Label>
                                        <Input
                                            required
                                            type="number"
                                            name="deductInsurance"
                                            value={formData.deductInsurance}
                                            onChange={handleInputChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label>Other</Label>
                                        <Input
                                            required
                                            type="number"
                                            name="deductOther"
                                            value={formData.deductOther}
                                            onChange={handleInputChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <h6>Other information</h6>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Interested amount</Label>
                                        <Input
                                            disabled
                                            type='number'
                                            value={interestedAmount}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Bring home amount</Label>
                                        <Input
                                            disabled
                                            type='number'
                                            value={totalBringHome}
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
                    </Container>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
}

export default NewClientLoan;