import React from 'react';
import 'antd/dist/antd.css';
import {Table} from 'antd';
import './App.css';
import NestedTable from "./NestedTable";


function App() {

  return (
    <div className="App">
      {/*WELCOME TO THE REACT PROJECT*/}
        <NestedTable />
    </div>
  );
}

export default App;
