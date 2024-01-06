import React from 'react';
import { Outlet } from 'react-router-dom';
import { Button, Col } from 'reactstrap';

const Reports = () => {
    return (
        <Col style={{
            background: "whitesmoke",
            minWidth: 400,
            borderRadius: 30,
            padding: 30
        }}>
            <h5>Reports</h5>
            <Button>CBU report</Button>
             <br />
            <Button>Remitance report</Button>
            <br />
            <Button>Itinerary report</Button>
            <br />

            <Outlet/>
        </Col>
    );
}

export default Reports;