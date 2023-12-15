import React, { useState } from "react"
import { Button, ButtonGroup, Table } from "reactstrap";

const TableClients = () => {

    const [showDetails, setShowDetails] = useState({});

    const toggleDetails = (clientId) => {
        setShowDetails((prevShowDetails) => ({
            ...prevShowDetails,
            [clientId]: !prevShowDetails[clientId],
        }));
    };

    const renderDetails = (clientId) => {
        if (showDetails[clientId]) {
            return (
                <tr>
                    <td colSpan="4">
                        <div className="details-container">
                            Loan details for Client {clientId}
                        </div>
                    </td>
                </tr>
            );
        }
        return null;
    };


    return (
        <div style={{ padding: 10 }}>
            <Table size="sm" hover striped >
                <thead>
                    <tr>
                        <div>

                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th style={{ width: 200 }}>Actions</th>
                        </div>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <div>
                            <td>Client 1</td>
                            <td>sldkfj </td>
                            <td>elskdjf</td>
                            <td>
                                <span>
                                    <ButtonGroup>
                                        <Button color="info" size="sm">
                                            Update
                                        </Button>
                                        <Button
                                            color="warning"
                                            size="sm"
                                            onClick={() => toggleDetails(1)}
                                        >
                                            View Loan
                                        </Button>
                                    </ButtonGroup>
                                </span>
                            </td>
                        </div>
                        <div>
                            {renderDetails(1)}

                        </div>


                    </tr>
                    <tr>

                        <td>Client 1</td>
                        <td>sldkfj </td>
                        <td>elskdjf</td>
                        <td>
                            <span>
                                <ButtonGroup>
                                    <Button color="info" size="sm">Update</Button>
                                    <Button color="warning" size="sm">View Loan</Button>
                                </ButtonGroup>
                            </span>
                        </td>
                    </tr>
                    <tr>

                        <td>Client 1</td>
                        <td>sldkfj </td>
                        <td>elskdjf</td>
                        <td>
                            <span>
                                <ButtonGroup>
                                    <Button color="info" size="sm">Update</Button>
                                    <Button color="warning" size="sm">View Loan</Button>
                                </ButtonGroup>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default TableClients;