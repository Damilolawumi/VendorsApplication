import React, {useEffect, useState} from 'react';
import {Table, Button} from 'antd';
import axios from 'axios';
import Application from "./Applications";

function NestedTable() {

    const [vendors, setVendors] = useState([]);

    const [columns, setColumns] = useState([
        {title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left'},
        {
            title: '# of Applications', dataIndex: 'platform', key: 'platform', render: (text, record, index) => {
                return <p key={index}>{record?.applications?.length} Apps</p>
            }
        },
        {title: 'Total Spend', dataIndex: 'total_spend', key: 'total_spend'},
        {title: 'Active Contract', dataIndex: 'active_contract', key: 'active_contract',},
        {title: 'Source', dataIndex: 'source', key: 'source'},
        {title: 'Contract Value', dataIndex: 'contract_value', key: 'contract_value',},
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

        const data = record.applications.map((row, index) => {
            return {
                ...row,
                key: index
            }
        });
        return <div>
            <Application data={data}/>
        </div>
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
            <Button onClick={handleAddColumn} type="primary" style={{marginBottom: 16}}>
                Add a column
            </Button>
            <Table
                loading={loading}
                bordered
                scroll={{x: 'max-content'}}
                className="components-table-demo-nested"
                columns={columns}
                expandable={{expandedRowRender}}
                dataSource={vendors}
            />
        </div>
    );
}

export default NestedTable;