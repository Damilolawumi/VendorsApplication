import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import {Typography} from 'antd';
import NestedTable from "./NestedTable";

const {Title} = Typography;

function App() {

    return (
        <div className="App">
            <div className='app-container'>
                <Title> Welcome To The Vendor Application </Title>
            </div>

            <NestedTable/>
        </div>
    );
}

export default App;
