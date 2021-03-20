import React, {useEffect, useState} from 'react';
import {Table, Button} from 'antd';
import axios from 'axios';

function NestedTable() {

    const [vendors, setVendors] = useState([]);
    const [columns, setColumns] = useState([
        {title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left'},
        {title: '# of Applications', dataIndex: 'platform', key: 'platform', responsive: ['sm'], render: (text, record, index)=> {
                return <p key={index}>{record?.applications?.length} Apps</p>
            }},
        {title: 'Total Spend', dataIndex: 'total_spend', key: 'total_spend'},
        {title: 'Active Contract', dataIndex: 'active_contract', key: 'active_contract', responsive: ['md']},
        {title: 'Source', dataIndex: 'source', key: 'source'},
        {title: 'Contract Value', dataIndex: 'contract_value', key: 'contract_value',   responsive: ['lg']},
    ]);
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


    const handleAddColumn = () => {
        const oldColumns = [...columns]
        const newColumn = {
            title: 'Total Spend',
            dataIndex: 'total_spend',
        };
        setColumns([...oldColumns, newColumn])
    }


    return (
        <div className='nested-container'>
            <Button onClick={handleAddColumn} type="primary" style={{ marginBottom: 16 }}>
                Add a column
            </Button>
            <Table
                loading={loading}
                bordered
                scroll={{ x: 'max-content' }}
                className="components-table-demo-nested"
                columns={columns}
                expandable={{expandedRowRender}}
                dataSource={vendors}
            />
        </div>
    );
}

export default NestedTable;