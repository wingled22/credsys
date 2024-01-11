import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';  // Add the missing import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  // Add the missing import
import { faPrint } from '@fortawesome/free-solid-svg-icons';  // Add the missing import

import UserContext from './UserContext';

const ClientTransactions = () => {
    const { user, setUser } = useContext(UserContext);

    const [loading, setLoading] = useState(true);
    const [trans, setTrans] = useState([]);

    console.log(user);

    const getTrans = async () => {
        try {
            const response = await fetch(`http://localhost:5034/api/Transaction/${user.clientId}`);
            const data = await response.json();

            setTrans(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getTrans();
    }, [user.clientId]);

    return (
        <Container className="container-fluid" style={{ marginTop: 20 }}>
            <Col
                style={{
                    background: 'whitesmoke',
                    minWidth: 400,
                    borderRadius: 30,
                    padding: 30,
                    height: '80vh',
                }}
            >
                {loading ? (
                    <h4>Loading transactions</h4>
                ) : (
                    
                    <div>
                        <h2>Loan Details</h2>
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Loan ID</th>
                                    <th>Type</th>
                                    <th>Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trans.map((loan) => (
                                    <tr key={loan.id}>
                                        <td>{loan.id}</td>
                                        <td>{loan.type}</td>
                                        <td>{loan.dueDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                      
                    </div>
                )}
            </Col>
        </Container>
    );
};

export default ClientTransactions;
