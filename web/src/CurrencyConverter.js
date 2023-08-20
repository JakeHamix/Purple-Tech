import React, { useState } from 'react';
import * as currencyCodes from 'currency-codes';
import getSymbolFromCurrency from 'currency-symbol-map'
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import FilterableDropdown from './FilterableDropdown';
import axios from 'axios';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const defaultBaseCurrencyOption = { code: 'USD', name: 'US Dollar', symbol: '$' };
  const [selectedBaseCurrencyOption, setSelectedBaseCurrencyOption] = useState(defaultBaseCurrencyOption);

  const defaultTargetCurrencyOption = { code: 'EUR', name: 'Euro', symbol: '€' };
  const [selectedTargetCurrencyOption, setSelectedTargetCurrencyOption] = useState(defaultTargetCurrencyOption);

  const availableCurrencies = currencyCodes.data;
  const currencyOptions = availableCurrencies.map(currency => {
    return {
      ...currency,
      symbol: getSymbolFromCurrency(currency.code),
    }
  });

  const handleConvert = () => {
    if (!amount || loading) return; // Return if no amount or request is loading

    setLoading(true); // Start loading

    // Prepare payload for the request
    const payload = {
      fromCurrency: selectedBaseCurrencyOption.code,
      toCurrency: selectedTargetCurrencyOption.code,
      inputValue: parseFloat(amount),
    };

    // Send POST request using axios
    axios
      .post('http://localhost:3001/api/convert', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        setLoading(false);
        console.log(response);
        // Update state with converted value and stop loading
        setConvertedAmount(response.data.outputValue);
      })
      .catch(error => {
        setLoading(false); // Stop loading in case of an error
        console.error('Error:', error);
        setConvertedAmount(error.message);
      });
  };

  const handleSwapCurrencies = () => {
    // Swap the values of base and target currencies
    setConvertedAmount(null);

    // TODO: Refactor the FilterableDropdown to a React.Component, so its state can be properly managed!
    setSelectedBaseCurrencyOption(selectedTargetCurrencyOption);
    setSelectedTargetCurrencyOption(selectedBaseCurrencyOption);
  };

  return (
    <Container className="my-4 p-4 bg-light rounded shadow">
      <h1 className="text-center mb-4 text-black">Currency Converter</h1>

      <InputGroup className="mb-3 w-75 mx-auto">
        <FormControl
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="text-center"
        />

        <InputGroup.Text
        as={InputGroup.Append}>
          {selectedBaseCurrencyOption.symbol}
        </InputGroup.Text>

        <FilterableDropdown
        options={currencyOptions}
        onSelect={option => setSelectedBaseCurrencyOption(option)}
        defaultValue={defaultBaseCurrencyOption}
        >
        </FilterableDropdown>

        <Button
          variant="outline-secondary"
          onClick={handleSwapCurrencies}
          className="m-3"
          style={{ transform: 'rotate(90deg)' }}
        >
          ⇅
        </Button>

        <InputGroup.Text
          as={InputGroup.Append}>
          {selectedTargetCurrencyOption.symbol}
        </InputGroup.Text>

        <FilterableDropdown
          options={currencyOptions}
          onSelect={option => setSelectedTargetCurrencyOption(option)}
          defaultValue={defaultTargetCurrencyOption}
        >
        </FilterableDropdown>

      </InputGroup>

      <Button
        variant="primary"
        onClick={handleConvert}
        className="w-25"
        disabled={!amount} // Disable button when amount is empty
      >
        Convert
      </Button>

      {convertedAmount !== null && typeof convertedAmount === "number" && (
        <p className="text-center mt-4 text-black">
           Converted amount: {convertedAmount.toFixed(2)} {selectedTargetCurrencyOption.symbol}
        </p>
      ) || (typeof convertedAmount === "string" && <p className="text-center mt-4 text-black"> Error: {convertedAmount}</p>)}
    </Container>
  );
};

export default CurrencyConverter;
