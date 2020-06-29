import { PetTypeNameEnum } from '../enum/pet-type-name.enum';

export interface EditPetDTO {
  name: string;
  description: string;
  type: PetTypeNameEnum;
  file?: string;
}
