import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { Button, Col } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass1, faLeftLong, faPrint, faUser, faUsers } from "@fortawesome/free-solid-svg-icons"



import "./Reciept.css"

const Reciept = () => {

    const { transId } = useParams();
    const componentRef = useRef();
    const navigate = useNavigate();

    const [client, setClient] = useState({});
    const [transaction, setTransaction] = useState({});

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const goBackOneStep = () => {
        navigate(-1); 
    };

    const getTransInfo = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_API_URL}/api/Transaction/GetTransaction?transId=${transId}`
            );
            const data = await response.json();
            setTransaction(data);
            getClientInfo();
        } catch (error) {
            console.log(error);
        }
    };

    const getClientInfo = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_API_URL}/api/Client/GetClientInfoFromLoan?loanId=${transaction.loanId}`
            );
            const data = await response.json();
            setClient(data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getTransInfo();
    }, []);

    return (

        <Col style={{
            background: "whitesmoke",
            minWidth: 400,
            borderRadius: 30,
            padding: 30
        }}>
            <Button color='warning'
                onClick={goBackOneStep}
            >
                <FontAwesomeIcon icon={faLeftLong} color='whitesmoke' />
            </Button>

            <ReactToPrint
                trigger={() =>
                    <Button color='success' className='mx-1' >
                        <FontAwesomeIcon icon={faPrint} />
                    </Button>
                }
                content={() => componentRef.current}
            />

            <div className="receipt" ref={componentRef} >
                <div className="header">
                    <h1>Official Receipt</h1>
                </div>
                <div className="company-info">
                    <p>KASKWEK Inc.</p>
                    <p>San Vicente St.</p>
                    <p>Bogo City, Cebu 6010</p>
                    <p>Phone: 0912345678</p>
                </div>
                <br />
                <div className="transaction-details">
                    <div className="item">Date:  {`${months[new Date(transaction.paymentDate).getMonth()]} ${new Date(transaction.paymentDate).getDate()}, ${new Date(transaction.paymentDate).getFullYear()}`}</div>
                    <div className="item">Customer: {client.name}</div>
                </div>
                <div className="loan-details">
                    <div className="item">Total Paid Amount: ₱{transaction.amount}</div>
                </div>

                <div className="payment-details">
                    <div className="item">Payment Method: Cash</div>
                    <div className="item">Transaction ID: {transaction.transId} </div>
                </div>
                <br />
                <br />
                <br />
                <div className="signature">
                    <div className="item">Received by:</div>
                    <div className="digital-signature-placeholder"></div>
                </div>
                <div className="footer">
                    <p>Thank you for choosing KASKWEK!</p>
                </div>
            </div>
        </Col>

    );
}

export default Reciept;