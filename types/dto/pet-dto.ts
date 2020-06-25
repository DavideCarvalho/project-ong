import { OngDTO } from './ong-dto';
import { PetTypeNameEnum } from '../enum/pet-type-name.enum';

export interface PetDTO {
  name: string;
  id: string;
  description: string;
  photoUrl: string;
  ong: OngDTO;
  type: PetTypeNameEnum;
}
