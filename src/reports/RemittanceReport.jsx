import React, { useRef, useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Col, Row, TabPane, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from "@fortawesome/free-solid-svg-icons"
import ReactToPrint from 'react-to-print';


const RemittanceReport = () => {
    const [denominations, setDenominations] = useState({
        onePeso: 0,
        fivePeso: 0,
        tenPeso: 0,
        twentyPeso: 0,
        fiftyPeso: 0,
        oneHundredPeso: 0,
        twoHundredPeso: 0,
        fiveHundredPeso: 0,
        oneThousandPeso: 0,
    });

    const componentRef = useRef();

    const [diff, setDiff] = useState(0)

    const [dailySales, setDailySales] = useState(0);
    const [report, setReport] = useState('');

    const handleDenominationChange = (denomination, value) => {
        setDenominations((prevDenominations) => ({
            ...prevDenominations,
            [denomination]: parseInt(value, 10) || 0,
        }));
    };

    const handleCalculate = () => {
        const totalRemittance =
            1 * denominations.onePeso +
            5 * denominations.fivePeso +
            10 * denominations.tenPeso +
            20 * denominations.twentyPeso +
            50 * denominations.fiftyPeso +
            100 * denominations.oneHundredPeso +
            200 * denominations.twoHundredPeso +
            500 * denominations.fiveHundredPeso +
            1000 * denominations.oneThousandPeso;

        const difference = totalRemittance - dailySales;
        setDiff(difference);

        if (difference === 0) {
            setReport('Remittance is balanced.');
        } else if (difference > 0) {
            setReport(`Over remittance by ${difference.toFixed(2)} PHP.`);
        } else {
            setReport(`Short remittance by ${Math.abs(difference).toFixed(2)} PHP.`);
        }
    };

    return (
        <Col style={{
            background: "whitesmoke",
            minWidth: 400,
            borderRadius: 30,
            padding: 30
        }}>
            <div className="overflow-auto client-table-container" style={{ margin: 20, height: "90%" }}>
                <h2>Remittance Report</h2>
                <Form>
                    <Row>
                        {Object.entries(denominations).map(([denomination, count]) => (
                            <Col md={3} key={denomination}>
                                <FormGroup>
                                    <Label for={denomination}>
                                        {denomination.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                                    </Label>
                                    <Input
                                        type="number"
                                        id={denomination}
                                        value={count}
                                        onChange={(e) => handleDenominationChange(denomination, e.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                        ))}
                    </Row>
                    <FormGroup>
                        <Label for="dailySales">Money On Hand:</Label>
                        <Input
                            type="number"
                            id="dailySales"
                            value={dailySales}
                            onChange={(e) => setDailySales(parseFloat(e.target.value))}
                        />
                    </FormGroup>
                    <Button color="primary" onClick={handleCalculate}>
                        Calculate
                    </Button>
                </Form>
                <br />
                <hr />
                <br />
                
                <ReactToPrint
                trigger={() => <Button color='success' className='mx-1'>
                    <FontAwesomeIcon icon={faPrint} />
                </Button>}
                content={() => componentRef.current} />
                
                <div ref={componentRef} style={{ padding: 20 }}>
                    <center>
                        <h2>Remittance Report</h2>
                    </center>

                    <Table striped bordered responsive >
                        <thead>
                            <tr>
                                <th>Denomination</th>
                                <th>Quantity</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1 peso</td>
                                <td> {denominations.onePeso}</td>
                                <td>{denominations.onePeso * 1}</td>
                            </tr>
                            <tr>
                                <td>5 peso</td>
                                <td> {denominations.fivePeso}</td>
                                <td>{denominations.fivePeso * 5}</td>
                            </tr>
                            <tr>
                                <td>10 peso</td>
                                <td> {denominations.tenPeso}</td>
                                <td>{denominations.tenPeso * 10}</td>
                            </tr>
                            <tr>
                                <td>20 peso</td>
                                <td> {denominations.twentyPeso}</td>
                                <td>{denominations.twentyPeso * 20}</td>
                            </tr>
                            <tr>
                                <td>50 peso</td>
                                <td> {denominations.fiftyPeso}</td>
                                <td>{denominations.fiftyPeso * 50}</td>
                            </tr>
                            <tr>
                                <td>100 peso</td>
                                <td> {denominations.oneHundredPeso}</td>
                                <td>{denominations.oneHundredPeso * 100}</td>
                            </tr>
                            <tr>
                                <td>200 peso</td>
                                <td> {denominations.twoHundredPeso}</td>
                                <td>{denominations.twoHundredPeso * 200}</td>
                            </tr>
                            <tr>
                                <td>500 peso</td>
                                <td> {denominations.fiveHundredPeso}</td>
                                <td>{denominations.fiveHundredPeso * 500}</td>
                            </tr>
                            <tr>
                                <td>1000 peso</td>
                                <td> {denominations.oneHundredPeso}</td>
                                <td>{denominations.oneHundredPeso * 1000}</td>
                            </tr>
                        </tbody>

                    </Table>
                    <hr />
                    <Row>
                        <Col md={6} >
                            <FormGroup>
                                <Label>Total Collection:</Label>
                                <Input disabled value={diff} />
                            </FormGroup>
                        </Col>
                        <Col md={6} >
                            <FormGroup>
                                <Label>Money Onhand:</Label>
                                <Input disabled value={dailySales} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <strong>{report}</strong>
                    </Row>

                </div>
            </div>
        </Col>
    );
};

export default RemittanceReport;
