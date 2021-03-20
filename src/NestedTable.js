import React, {useEffect, useState} from 'react';
import {Table} from 'antd';
import axios from 'axios';

function NestedTable() {

    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchVendorData = () => {
        setLoading(true)
        axios.get('data.json')
            .then((response) => {
                const data = response.data.map((vendor, index) => {
                    return {...vendor, key: index}
                })
                setVendors(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error.response)
            })
    }

    useEffect(() => {
        fetchVendorData()
    }, [])

    const expandedRowRender = (record, index, indent, expanded) => {
        const columns = [
            {title: 'Name', dataIndex: 'application_name', key: 'application_name'},
            {title: 'Category', dataIndex: 'category', key: 'category'},
            {title: 'App Covered In Contract', dataIndex: 'app_covered_in_contract', key: 'app_covered_in_contract'},
        ];

        const data = record.applications.map((row, index) => {
            return {
                ...row,
                key:index
            }
        });
        return <Table columns={columns} dataSource={data} pagination={false}/>;
    };

    const columns = [
        {title: 'Name', dataIndex: 'name', key: 'name'},
        // {title: '# of Applications', dataIndex: 'platform', key: 'platform'},
        {title: 'Total Spend', dataIndex: 'total_spend', key: 'total_spend'},
        {title: 'Active Contract', dataIndex: 'active_contract', key: 'active_contract'},
        {title: 'Source', dataIndex: 'source', key: 'source'},
        {title: 'Contract Value', dataIndex: 'contract_value', key: 'contract_value'},
    ];


    return (
        <div className='nested-container'>
            <Table
                loading={loading}
                className="components-table-demo-nested"
                columns={columns}
                expandable={{expandedRowRender}}
                dataSource={vendors}
            />
        </div>
    );
}

export default NestedTable;