import React from 'react';
import {Table} from "antd";

const columns = [{
    dataIndex: 'value',
    key: 'value'
}];

const AddressDisplay = ({address}) => {
    const singleRowData = (data, value) => ({
        key: data.length+1,
        value
    });
    const getDataFromAddress = (address) => {
        const data = [];
        data.push(singleRowData(data, address.street+' '+address.buildingNumber));
        data.push(singleRowData(data, address.postCode+' '+address.city));
        data.push(singleRowData(data, address.country));
        data.push(singleRowData(data, address.phone));
        return data;
    };
    return (
        <Table columns={columns} dataSource={getDataFromAddress(address)} showHeader={false} pagination={false} />
    );
};

export default AddressDisplay;