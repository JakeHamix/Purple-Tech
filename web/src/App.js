import React from 'react';
import CurrencyConverter from './CurrencyConverter';
import NavbarComponent from './Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavbarComponent/>
      <header className="App-header">
        <h2 align>
          Purple-hire-o-mat
        </h2>
        <CurrencyConverter/>
      </header>
    </div>
  );
}

export default App;
