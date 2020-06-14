import React from 'react';

interface Option {
  text: string;
  value: string | number;
}

interface Props {
  options: Option[];
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<Props> = ({ options = [], value, onChange }) => {
  return (
    <div className="select is-rounded">
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
