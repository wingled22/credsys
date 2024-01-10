import React, { useState } from 'react';
import { Col, Form, FormGroup, Input, Row, Button, Table } from "reactstrap";
import { Link } from "react-router-dom";



import province from "../comp/address/province.json";
import city from "../comp/address/city.json";
import barangay from "../comp/address/barangay.json";


const Payment = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5034/api/Client/SearchClientByName?searchString=${encodeURIComponent(searchQuery)}`);
            if (response.ok) {
                const data = await response.json();
                setSearchResults(data);
            } else {
                console.error('Error searching clients:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred during the search:', error.message);
        }
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
                    <Col md="8">
                        <Form onSubmit={handleSearch}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="searchInput"
                                    id="searchInput"
                                    placeholder="Enter client's name ..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col md="4">
                        <Button style={{ background: "#DFA248" }} onClick={handleSearch} className="w-100">Search</Button>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ padding: 10 }}>
                        <Table bordered striped size='sm'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map(client => (
                                    <tr key={client.id}>
                                        <td>{client.name}</td>
                                        <td>{client.additionalAddressInfo == null
                                            ? ""
                                            : client.additionalAddressInfo + ", "}
                                            {client.barangay == null
                                                ? ""
                                                : (barangay.find((item) => item.brgy_code === client.barangay) ||
                                                    {}).brgy_name + ", "}
                                            {client.city == null
                                                ? ""
                                                : (city.find((item) => item.city_code === client.city) ||
                                                    {}).city_name + ", "}
                                            {client.province == null
                                                ? ""
                                                : (province.find((item) => item.province_code === client.province) ||
                                                    {}).province_name}</td>
                                        <td>
                                            <Link to={`/admin/payment/clientloans/${client.id}`}>
                                                <Button size='sm'>View Loan</Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Col>
        </>
    );
}

export default Payment;
