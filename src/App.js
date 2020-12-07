import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import TableHeader from './components/Table/TableHeader/TableHeader';
import TableHeaderContainer from './components/Table/TableHeader/TableHeaderContainer';
import TableItemContainer from './components/Table/TableItem/TableItemContainer';


const App = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <TableHeaderContainer />
      <TableItemContainer />
    </div>
  );
}


export default App;
