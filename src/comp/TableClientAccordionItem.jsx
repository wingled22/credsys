import React, { useState } from "react";
import { Button, Container, Form, Modal, ModalBody, ModalHeader } from "reactstrap";

import province from "./address/province.json";
import city from "./address/city.json";
import barangay from "./address/barangay.json";
import TableClientAccordionItemDetail from "./TableClientAccordionItemDetail";

const TableClientAccordionItem = ({ rowData }) => {
    const [expandedRow, setExpandedRow] = useState(false);
    const toggleDetails = () => {
        setExpandedRow(!expandedRow);
    };

    const renderDetails = (rowData) => {
        if (expandedRow) {
            return <TableClientAccordionItemDetail {...rowData} />
        }
        return null;
    };

    

    return (
        <React.Fragment>
            <tr size="sm">
                <td>{rowData.name}</td>
                <td>{rowData.contactNumber}</td>
                <td>
                    {rowData.additionalAddressInfo == null
                        ? ""
                        : rowData.additionalAddressInfo + ", "}
                    {rowData.barangay == null
                        ? ""
                        : (barangay.find((item) => item.brgy_code === rowData.barangay) ||
                            {}).brgy_name + ", "}
                    {rowData.city == null
                        ? ""
                        : (city.find((item) => item.city_code === rowData.city) ||
                            {}).city_name + ", "}
                    {rowData.province == null
                        ? ""
                        : (province.find((item) => item.province_code === rowData.province) ||
                            {}).province_name}
                </td>
                <td>
                    <Button
                        color="warning"
                        size="sm"
                        onClick={() => toggleDetails()}
                    >
                        View Loan
                    </Button>
                   
                </td>
            </tr>
            {renderDetails(rowData)}
        </React.Fragment>
    );
};

export default TableClientAccordionItem;
