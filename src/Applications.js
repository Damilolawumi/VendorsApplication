import React, {useState} from 'react';
import {Button, Table} from "antd";

function Application(props) {

    const [subColumns, setSubColumns] = useState([
        {title: 'Name', dataIndex: 'application_name', key: 'application_name',fixed: 'left'},
        {title: 'Category', dataIndex: 'category', key: 'category'},
        {title: 'App Covered In Contract', dataIndex: 'app_covered_in_contract', key: 'app_covered_in_contract'},
    ])

    const handleAddSubColumn = () => {
        const oldSubColumns = [...subColumns]
        const newSubColumn = {
            title: 'category',
            dataIndex: 'category',
        };
        setSubColumns([...oldSubColumns, newSubColumn])
    }

    return (
        <div>
            <Button onClick={handleAddSubColumn} type="primary" style={{marginBottom: 16}}>
                Add column to applications table
            </Button>
            <Table columns={subColumns} dataSource={props.data} pagination={false} scroll={{x: 'max-content'}}/>;
        </div>
    )
}

export default Application;