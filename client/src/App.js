import React, {useState} from 'react';
import './App.css';
import Header from './components/Header';
import axios from 'axios';
import {Router, navigate} from '@reach/router'
import Add from './components/Add';
import Table from './components/Table';
import Details from './components/Details';
import Edit from './components/Edit';

// {
  // title:"",
  // description:"",
  // url:"",
//   reviews: [{
//       comment:String,
//       rating:Number
//   }]
// }
function App() {
  
  return (
    <div className="App">
      <Header />
      <Router>
        <Table path="/" />
        <Add path="/new" />
        <Details path="/details/:id" />
        <Edit path="/edit/:id" />
      </Router>
    </div>
  );
}

export default App;
