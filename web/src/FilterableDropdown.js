import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

const FilterableDropdown = ({ options, onSelect, value, setValue, setConvertedAmount }) => {
  const [dropdownOptions, setDropdownOptions] = useState(options);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <input
          type="text"
          placeholder="Type to search..."
          value={value.code}
          onChange={(e) => {
            setValue(e.target.value);
            setDropdownOptions(options.filter((option) => option.code.startsWith(e.target.value.toUpperCase())));
          }}
          className="form-control"
        />
      </Dropdown.Toggle>
      <Dropdown.Menu className="CurrencyDropdown">
        {dropdownOptions.map((option) => (
          <Dropdown.Item
            key={option.code}
            onClick={() => {
              setConvertedAmount(null);
              setValue(option);
              onSelect(option);
            }}
          >
            {option.code} - {option.currency} - {option.symbol}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FilterableDropdown;
