import React, { useState, useEffect } from 'react';
import { Navbar, Container } from 'react-bootstrap';

const NavbarComponent = () => {
  const [favoriteCurrency, setFavoriteCurrency] = useState('?');
  const [totalRequests, setTotalRequests] = useState('?');
  const [totalConvertedAmount, setTotalConvertedAmount] = useState('?');

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3001/api/sse');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data, 'data');
      setFavoriteCurrency(data.mostPopularCurrency);
      setTotalRequests(data.conversionsCount);
      setTotalConvertedAmount(data.amountConvertedUSD);
    };

    eventSource.onerror = (error) => {
      console.error('Error occurred:', error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Statistics</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <ul className="navbar-nav ml-auto border-top border-black">
            <li className="nav-item m-1">Favorite Destination Currency: {favoriteCurrency}</li>
            <li>|</li>
            <li className="nav-item m-1">Total Requests: {totalRequests}</li>
            <li>|</li>
            <li className="nav-item m-1">Total Converted Amount: ${typeof totalConvertedAmount === "number" ? totalConvertedAmount.toFixed(2) : totalConvertedAmount.toString()}</li>
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
