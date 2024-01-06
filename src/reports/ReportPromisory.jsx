import React, { useEffect, useState } from 'react';
import { Col } from 'reactstrap';
import { useParams } from 'react-router-dom';


import province from "../comp/address/province.json";
import city from "../comp/address/city.json";
import barangay from "../comp/address/barangay.json";

import "./ReportPromisory.css";



const ReportPromisory = () => {

    const [reportData, setReportData] = useState(null);
    const { loanId } = useParams();


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

            {
                reportData == null ? null : (
                    <div className="promissory-note">
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
                                    <tr>
                                        <td>Php 2,000.00</td>
                                        <td>January 15, 2024</td>
                                    </tr>
                                    <tr>
                                        <td>Php 2,000.00</td>
                                        <td>February 15, 2024</td>
                                    </tr>
                                    <tr>
                                        <td>Php 2,000.00</td>
                                        <td>March 15, 2024</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>

                        <section className="section promissory-note-section">
                            <h2>Promissory Note</h2>
                            <p>Address: ________________________</p>
                            <p>Date: ________________________</p>

                            <p>I ________________________ agree to pay the sum ________________________ pesos for value received, with interest payable on or before ________________________</p>

                            <div className="signature-section">
                                <div className="overprinted-name">
                                    <p>________________________</p>
                                    <p>SIGNATURE OVER PRINTED NAME</p>
                                </div>
                            </div>
                        </section>

                        <section className="section cbu-certificate-section">
                            <h2>CBU Certificate</h2>
                            <p>Address: ________________________</p>
                            <p>Date: ________________________</p>

                            <p>This is to certify the CBU of ________________________, amounting to ________________________, an equivalent of __________ shares. Furthermore, dividend sharing shall be done every end of the year.</p>

                            <div className="signature-section">
                                <div className="overprinted-name">
                                    <p>________________________</p>
                                    <p>KASKWEK PRESIDENT</p>
                                </div>
                            </div>
                        </section>

                        <section className="section certificate-of-insurance-section">
                            <h2>Certificate of Insurance</h2>
                            <p>Address: ________________________</p>
                            <p>Date: ________________________</p>

                            <p>This  is to certify that the INSURED NAME is entitled for a LIFE INSURANCE, in case of sudden accident/normal death within the period of (________________________). Furthermore, the ammoung received is  ________________________. </p>

                            <div className="signature-section">
                                <div className="overprinted-name">
                                    <p>________________________</p>
                                    <p>KASKWEK PRESIDENT</p>
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