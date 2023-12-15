import React, { useState } from "react"
import { Button } from "reactstrap"

import province from "./address/province.json"
import city from "./address/city.json"
import barangay from "./address/barangay.json"

const TableClientAccordionItem = ({ rowData, toggleDetails, renderDetails }) => {

    const handleToggleDetails = (id) => {
        return toggleDetails(id);
    }

    const handleRenderDetails = (row) => {
        return renderDetails(row);
    }

    return (
        <React.Fragment >
            <tr size="sm">
                <td>{rowData.name}</td>
                <td>{rowData.contactNumber}</td>
                <td>
                    {
                        rowData.additionalAddressInfo == null
                            ? ""
                            : rowData.additionalAddressInfo + ", "
                    }
                    {
                        rowData.barangay == null
                            ? ""
                            : (barangay.find((item) => item.brgy_code === rowData.barangay) || {}).brgy_name + ", "
                    }
                    {
                        rowData.city == null
                            ? ""
                            : (city.find((item) => item.city_code === rowData.city) || {}).city_name + ", "
                    }

                    {
                        rowData.province == null
                            ? ""
                            : (province.find((item) => item.province_code === rowData.province) || {}).province_name
                    }
                </td>

                <td>
                    <Button
                        color="warning"
                        size="sm"
                        onClick={() => handleToggleDetails(rowData.id)}
                    >
                        View Loan
                    </Button>
                </td>
            </tr>
            {handleRenderDetails(rowData)}
        </React.Fragment>
    );
}

export default TableClientAccordionItem 