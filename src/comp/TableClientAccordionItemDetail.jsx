import React, { useEffect, useState } from "react"
import { Button, ButtonGroup, Table } from "reactstrap";


const TableClientAccordionItemDetail = ({ id, name }) => {
    const [loans, setLoans] = useState([]);
    const [loadingLoans, setLoadingLoans] = useState(true);
    const [schedules, setSchedules] = useState([]);
    const [loadingScheds, setLoadingScheds] = useState(true);


    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5034/api/client/GetClientLoans?id=" + id);
            const data = await response.json();
            // setLoans((prevLoans) =>{
            //     return [...prevLoans, data]
            // });
            setLoans(data)
            setLoadingLoans(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoadingLoans(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const getLoanSchedule = async () => {
        try {
            const response = await fetch("http://localhost:5034/api/client/GetClientLoans?id=" + id);
            const data = await response.json();
            // setLoans((prevLoans) =>{
            //     return [...prevLoans, data]
            // });
            setSchedules(data)
            setLoadingScheds(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoadingScheds(false);
        }
    }


    return (
        <tr key={`details-${id}`} style={{ margin: 50 }}>
            <td colSpan="4">
                <div
                    className="details-container"
                    style={{ padding: 20 }}
                >
                    Loan Details

                    {
                        loadingLoans ? (
                            <h1>loading</h1>
                        ) : (
                            <Table bordered striped size="sm">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Total Payable</th>
                                        <th>Capital</th>
                                        <th>Interest</th>
                                        <th>Interest Amount</th>
                                        <th>Loan Receivable</th>
                                        <th>No Payment</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loans.map((loanData) => {
                                            return (
                                                <tr key={`loanID-${loanData.id}`}>
                                                    <td>{loanData.type}</td>
                                                    <td>{loanData.loanAmount}</td>
                                                    <td>{loanData.capital}</td>
                                                    <td>{loanData.interest}</td>
                                                    <td>{loanData.interestedAmount}</td>
                                                    <td>{loanData.loanReceivable}</td>
                                                    <td>{loanData.noPayment}</td>
                                                    <td>
                                                        <Button
                                                            color="info"
                                                            size="sm"
                                                            //style={{marginRight: 10}}
                                                            className="mx-1"
                                                            
                                                        >
                                                            View Loan
                                                        </Button>
                                                        <Button
                                                            color="success"
                                                            size="sm"
                                                        >
                                                            View Loan
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        )
                    }
                </div>
            </td>
        </tr>
    )
}

export default TableClientAccordionItemDetail