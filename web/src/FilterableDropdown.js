import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

const FilterableDropdown = ({ options, onSelect, defaultValue }) => {
  const [selectedItemTitle, setSelectedItemTitle] = useState(defaultValue.code);
  const [dropdownOptions, setDropdownOptions] = useState(options);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <input
          type="text"
          placeholder="Type to search..."
          value={selectedItemTitle}
          onChange={(e) => {
            setSelectedItemTitle(e.target.value);
            setDropdownOptions(options.filter(option => option.code.startsWith(e.target.value.toUpperCase())));
          }}
          className="form-control"
        />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {dropdownOptions.map(option => (
          <Dropdown.Item
            key={option.code}
            onClick={() => {
              setSelectedItemTitle(option.code);
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