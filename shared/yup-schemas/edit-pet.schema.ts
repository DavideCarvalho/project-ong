import * as Yup from 'yup';
import { PetTypeNameEnum } from '../types/enum/pet-type-name.enum';

export const EditPetSchema = Yup.object().shape({
  name: Yup.string().required('Nome do pet é obrigatório'),
  description: Yup.string().required('Descrição do pet é obrigatória'),
  file: Yup.string(),
  type: Yup.mixed<PetTypeNameEnum>()
    .oneOf(
      [PetTypeNameEnum.dog, PetTypeNameEnum.cat, PetTypeNameEnum.other],
      'Informe se o pet é um "cachorro", "gato" ou "outro"'
    )
    .required('Tipo do pet é obrigatório'),
});
