import React, { useEffect, useRef, useState } from 'react';
import { Button, Col } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';


import province from "../comp/address/province.json";
import city from "../comp/address/city.json";
import barangay from "../comp/address/barangay.json";

import "./ReportPromisory.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass1, faLeftLong, faPrint, faUser, faUsers } from "@fortawesome/free-solid-svg-icons"



const ReportPromisory = () => {

    const [reportData, setReportData] = useState(null);
    const { loanId } = useParams();
    const componentRef = useRef();

    const navigate = useNavigate();

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // functions

    const goBackOneStep = () => {
        navigate(-1); // This will navigate back by one step in the history
    };

    const getReport = async () => {
        try {

            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_API_URL}/api/Reports/PromisoryReport?loanId=${loanId}`
            );

            const data = await response.json();

            setReportData(data);

        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getReport();
        // console.log(`${import.meta.env.VITE_REACT_APP_API_URL}/api/Reports/PromisoryReport?loanId=${loanId}`);
    }, []);



    return (

        <Col style={{
            background: "whitesmoke",
            minWidth: 400,
            borderRadius: 30,
            padding: 30
        }}>
            <h5>Promisory Note</h5>
            
            <Button color='warning'
                onClick={goBackOneStep}
            >
                <FontAwesomeIcon icon={faLeftLong} color='whitesmoke' />
            </Button>
            <ReactToPrint
                trigger={() =>
                    <Button color='success' className="mx-1" >
                        <FontAwesomeIcon icon={faPrint} />
                    </Button>
                }
                content={() => componentRef.current}
            />

            {
                reportData == null ? ( <h4>Loading reports</h4> ) : (

                    <div className="promissory-note" ref={componentRef}>
                        <section className="section borrower-info-section">
                            <h2>Borrower's Information</h2>
                            <div className="horizontal-info">
                                <div className="info-item">
                                    <p>Client's Name:</p>
                                    <p><strong>{reportData.clientInfo.name}</strong></p>
                                </div>
                                <div className="info-item">
                                    <p>Loan Amount:</p>
                                    <p><strong>Php {reportData.loanInfo.capital}</strong></p>
                                </div>
                                <div className="info-item">
                                    <p>Total Payable:</p>
                                    <p><strong>Php {reportData.loanInfo.capital + reportData.loanInfo.interestedAmount}</strong></p>
                                </div>
                                <div className="info-item">
                                    <p>Address:</p>
                                    <p>
                                        <strong>
                                            {reportData.clientInfo.additionalAddressInfo == null
                                                ? ""
                                                : reportData.clientInfo.additionalAddressInfo + ", "}
                                            {reportData.clientInfo.barangay == null
                                                ? ""
                                                : (barangay.find((item) => item.brgy_code === reportData.clientInfo.barangay) ||
                                                    {}).brgy_name + ", "}
                                            {reportData.clientInfo.city == null
                                                ? ""
                                                : (city.find((item) => item.city_code === reportData.clientInfo.city) ||
                                                    {}).city_name + ", "}
                                            {reportData.clientInfo.province == null
                                                ? ""
                                                : (province.find((item) => item.province_code === reportData.clientInfo.province) ||
                                                    {}).province_name}
                                        </strong>
                                    </p>
                                </div>
                                <div className="info-item">
                                    <p>Interest Rate:</p>
                                    <p><strong>{reportData.loanInfo.interest}%</strong></p>
                                </div>
                                <div className="info-item">
                                    <p>Processing Fee:</p>
                                    <p><strong>Php {reportData.loanInfo.otherFee}</strong></p>
                                </div>
                                <div className="info-item">
                                    <p>CBU:</p>
                                    <p><strong>Php {reportData.loanInfo.deductCbu}</strong></p>
                                </div>
                                <div className="info-item">
                                    <p>Life Insurance:</p>
                                    <p><strong>Php {reportData.loanInfo.deductInsurance}</strong></p>
                                </div>
                            </div>
                        </section>

                        <section className="section payment-schedule-section">
                            <h2>Payment Schedule</h2>
                            <table className="payment-table">
                                <thead>
                                    <tr>
                                        <th>Collectables</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        reportData.listOfSchedules.map((sched) => {
                                            return (
                                                <tr key={`sched-${sched.id}`}>
                                                    <td>Php {sched.collectables}</td>
                                                    <td>
                                                        {`${months[new Date(sched.date).getMonth()]} ${new Date(sched.date).getDate()}, ${new Date(sched.date).getFullYear()}`}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </section>

                        <section className="section promissory-note-section">
                            <h2>Promissory Note</h2>
                            <p>Address: ________________________</p>
                            <p>Date: ________________________</p>

                            <p>
                                I <u><strong>{reportData.clientInfo.name}</strong></u> agree to pay the sum <u><strong> Php {reportData.loanInfo.capital + reportData.loanInfo.interestedAmount} </strong></u>
                                pesos for value received, with interest payable on or before <u> <strong> {`${months[new Date(reportData.loanInfo.dueDate).getMonth()]} ${new Date(reportData.loanInfo.dueDate).getDate()}, ${new Date(reportData.loanInfo.dueDate).getFullYear()}`}  </strong> </u> </p>

                            <div className="signature-section">
                                <div className="overprinted-name">
                                    <u style={{ lineHeight: .1 }}>
                                        <p>Dr.  Jonel Rhey D. Gelig</p>

                                    </u>
                                    <p style={{ lineHeight: .1 }}>
                                        <small>
                                            SIGNATURE OVER PRINTED NAME

                                        </small>
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="section cbu-certificate-section">
                            <h2>CBU Certificate</h2>
                            <p>Address: ________________________</p>
                            <p>Date: ________________________</p>

                            <p>This is to certify the CBU of <u><strong>{reportData.clientInfo.name}</strong></u> , amounting to  <u><strong> {reportData.loanInfo.deductCbu} </strong></u> , an equivalent of __________ shares. Furthermore, dividend sharing shall be done every end of the year.</p>

                            <div className="signature-section">
                                <div className="overprinted-name">
                                    <u style={{ lineHeight: .1 }}>
                                        <p>Dr.  Jonel Rhey D. Gelig</p>

                                    </u>
                                    <p style={{ lineHeight: .1 }}>
                                        <small>
                                            SIGNATURE OVER PRINTED NAME

                                        </small>
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="section certificate-of-insurance-section">
                            <h2>Certificate of Insurance</h2>
                            <p>Address: ________________________</p>
                            <p>Date: ________________________</p>

                            <p>This  is to certify that the INSURED NAME is entitled for a LIFE INSURANCE, in case of sudden accident/normal death within the period of (________________________). Furthermore, the ammoung received is <u><strong>{reportData.loanInfo.deductInsurance}</strong></u> . </p>

                            <div className="signature-section">
                                <div className="overprinted-name">
                                    <u style={{ lineHeight: .1 }}>
                                        <p>Dr.  Jonel Rhey D. Gelig</p>

                                    </u>
                                    <p style={{ lineHeight: .1 }}>
                                        <small>
                                            SIGNATURE OVER PRINTED NAME

                                        </small>
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                )
            }

        </Col>
    );
}

export default ReportPromisory;