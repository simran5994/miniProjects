import React from 'react';
import './App.css';
import 'h8k-components';
import Users from './components/Stocks';

const title = "Fetch Stocks";

const App = () => {
    return (
        <div className="App">
            <h8k-navbar header={title}></h8k-navbar>
            <Users />
        </div>
    );
}

export default App;
