import React, { useState } from 'react';
import * as currencyCodes from 'currency-codes';
import getSymbolFromCurrency from 'currency-symbol-map'
import { Container, InputGroup, FormControl, DropdownButton, Dropdown, Button } from 'react-bootstrap';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const availableCurrencies = currencyCodes.data;
  const currencyOptions = availableCurrencies.map(currency => {
    return {
      ...currency,
      symbol: getSymbolFromCurrency(currency.code),
    }
  });

  // This is a basic example, you might need to fetch actual exchange rates
  // const exchangeRates = {
  //   USD: 1,
  //   EUR: 0.85,
  //   GBP: 0.72,
  //   // Add more currencies and their rates
  // };

  const handleConvert = () => {
    const convertedValue = amount * 2; // For demonstration purposes
    setConvertedAmount(convertedValue);
  };

  return (
    <Container className="my-4 p-4 bg-light rounded shadow">
      <h1 className="text-center mb-4 text-black">Currency Converter</h1>

      <InputGroup className="mb-3 flex-grow-1">
        <FormControl
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="text-center"
        />

        <DropdownButton
          as={InputGroup.Append}
          title={baseCurrency}
          id="base-currency-dropdown"
        >
          {currencyOptions.map((option) => (
            <Dropdown.Item
              key={option.code}
              onClick={() => setBaseCurrency(option.code)}
            >
              {option.code} - {option.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        <DropdownButton
          as={InputGroup.Append}
          title={targetCurrency}
          id="target-currency-dropdown"
        >
          {currencyOptions.map((option) => (
            <Dropdown.Item
              key={option.code}
              onClick={() => setTargetCurrency(option.code)}
            >
              {option.code} - {option.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </InputGroup>

      <Button
        variant="primary"
        onClick={handleConvert}
        className="w-25"
      >
        Convert
      </Button>

      {convertedAmount !== null && (
        <p className="text-center mt-4">
          Converted amount: {convertedAmount.toFixed(2)}
        </p>
      )}
    </Container>
  );
};

export default CurrencyConverter;
