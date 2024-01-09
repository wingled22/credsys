import React from 'react';
import { Link, Outlet } from 'react-router-dom';
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
            <Link to={'/reports/cbu'}>
                <Button>CBU report</Button>
            </Link>
            <br />
            <Link to={'/reports/insurance'}>
                <Button>CBU insurance</Button>
            </Link>
            <br />
            <Button>Remitance report</Button>
            <br />
            <Button>Itinerary report</Button>
            <br />

            <Outlet />
        </Col>
    );
}

export default Reports;