import React from 'react';
import CurrencyConverter from './CurrencyConverter';
import NavbarComponent from './Navbar';
import './App.css';
// favicon provided by https://icons8.com/icons/set/favicon-money
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
