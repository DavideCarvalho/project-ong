import { PetTypeNameEnum } from '../enum/pet-type-name.enum';

interface CreatePetDTO {
  name: string;
  description: string;
  type: PetTypeNameEnum;
  file: string;
}
