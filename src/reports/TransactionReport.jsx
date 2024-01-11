import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Table, Button , Form, Row, FormGroup, Label, Input} from 'reactstrap';
import { Link } from 'react-router-dom';  // Add the missing import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  // Add the missing import
import { faPrint } from '@fortawesome/free-solid-svg-icons';  // Add the missing import
import { useRef } from 'react';
import UserContext from '../UserContext';

const TransactionReport = () => {

    const { user, setUser } = useContext(UserContext);

    const [loading, setLoading] = useState(true);
    const [trans, setTrans] = useState([]);

    const [reportData, setReportData] = useState([])
    const componentRef = useRef();
    const subtractDays = (date, days) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - days);
        return newDate;
    };

    const [from, setFrom] = useState(subtractDays(new Date(), 1));
    const [to, setTo] = useState(new Date);


    console.log(user);
   
    const toInputChange = (e) => {
        const { name, value, type } = e.target;

        setFrom(new Date(value));

    };

    const fromInputChange = (e) => {
        const { name, value, type } = e.target;

        setFrom(new Date(value));

    };

    const getTrans = async () => {
        try {
            const response = await fetch(`http://localhost:5034/api/Transaction/total-GetTotalCollectedToday-today`);
            const data = await response.json();

            setTrans(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
      

    }

    useEffect(() => {
        getTrans();
    }, []);

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

                <Form onSubmit={submitHandler}>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label>From</Label>
                                <Input
                                    type='date'
                                    value={from.toISOString().split('T')[0]}
                                    onChange={toInputChange}
                                />

                            </FormGroup>
                        </Col>

                      
                    </Row>
                    <Row>
                        <Button style={{ background: "#DFA248" }} type='submit'>
                            Submit
                        </Button>
                    </Row>
                </Form>
                <hr />
            </Col>
        </Container>
    );
}

export default TransactionReport;