import React from 'react';
import Select from './select';

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectPetType: React.FC<Props> = ({ value, onChange }) => {
  const options = [
    {
      text: 'Cachorro',
      value: 'dog',
    },
    {
      text: 'Gato',
      value: 'cat',
    },
    {
      text: 'Outro',
      value: 'other',
    },
  ];
  return (
    <div className="select is-rounded">
      <Select options={options} value={value} onChange={onChange} />
    </div>
  );
};
