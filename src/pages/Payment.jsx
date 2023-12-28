import React from 'react';
import { Col, Form, FormGroup, Input, Label, Row, Button, Table } from "reactstrap";

const Payment = () => {
    const handleSearch = (e) => {
        e.preventDefault();
        // Add your search logic here
        console.log("Performing search...");
    };

    return (
        <>
            <Col style={{
                background: "whitesmoke",
                minWidth: 400,
                borderRadius: 30,
                padding: 30
            }}>
                <h4>Payment Register</h4>
                <Row>
                    <Col md="8"> {/* Adjust the column size based on your layout needs */}
                        <Form onSubmit={handleSearch}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="searchInput"
                                    id="searchInput"
                                    placeholder="Enter client's name ..."
                                />
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col md="4"> {/* Adjust the column size based on your layout needs */}
                        <Button style={{ background: "#DFA248" }} onClick={handleSearch} className="w-100">Search</Button>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ padding: 10 }}>
                        <Table bordered striped size='sm'>
                            <thead>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>sldkffje </td>
                                    <td>sldkffje </td>
                                    <td>
                                        <Button size='sm'>sdfs</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Col>
        </>
    );
}

export default Payment;
