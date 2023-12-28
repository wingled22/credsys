import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";


import TableClientAccordionItem from "./TableClientAccordionItem";
import  "./TableClientAccordion.css";

//TODO: add update client info
const TableClientAccordion = () => {

  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);
  const [clientData, setClientData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5034/api/client/GetClients");
        const data = await response.json();
        setClientData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);   


  const toggleDetails = (rowIndex) => {
    setExpandedRow((prevExpandedRow) =>
      prevExpandedRow === rowIndex ? null : rowIndex
    );

  };

  const renderDetails = (rowData) => {
    if (expandedRow === rowData.id) {
      return (
        <tr key={`details-${rowData.id}`} style={{ margin: 50 }}>
          <td colSpan="4">
            <div className="details-container"
              style={{ padding: 20 }}
            >
              Loan details for {rowData.id} {rowData.name}
            </div>
          </td>
        </tr>
      );
    }
    return null;
  };

  return (
    <div className="overflow-auto client-table-container" style={{ margin: 20, height:"90%" }}>
      <Table size="sm" hover >
        <thead className="sticky-head">
          <tr>
            <th>Full Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th style={{ width: 200 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            loading ? (
              <tr>
                <td colSpan={4}>
                  <p>Loading...</p>
                </td>
              </tr>
            ) : (
              clientData.map((rowData, index) => (
                <TableClientAccordionItem key={rowData.id} rowData={rowData} renderDetails={renderDetails} toggleDetails={toggleDetails}/>
              ))
            )
          }
        </tbody>
      </Table>

    </div>
  );
};

export default TableClientAccordion;
