import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import NestedTable from "./NestedTable";


function App() {

    return (
        <div className="App">
            <p className='app-title'>
                Welcome To The Vendor Application
            </p>

            <NestedTable/>
        </div>
    );
}

export default App;
