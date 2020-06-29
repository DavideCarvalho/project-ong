import React from 'react';
import Select from './select';
import { PetTypeNameEnum } from '../../shared/types/enum/pet-type-name.enum';

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectPetType: React.FC<Props> = ({ value, onChange }) => {
  const options = [
    {
      text: 'Cachorro',
      value: PetTypeNameEnum.dog,
    },
    {
      text: 'Gato',
      value: PetTypeNameEnum.cat,
    },
    {
      text: 'Outro',
      value: PetTypeNameEnum.other,
    },
  ];
  return (
    <div className="select is-rounded">
      <Select options={options} value={value} onChange={onChange} />
    </div>
  );
};
