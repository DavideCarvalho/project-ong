import { OngDTO } from './ong.dto';
import { PetTypeNameEnum } from '../enum/pet-type-name.enum';

export interface PetDTO {
  name: string;
  id: string;
  description: string;
  photoUrl: string;
  eyes: string;
  breed: string;
  fur: string;
  age: Date;
  rescuedDate: Date;
  ong: OngDTO;
  type: PetTypeNameEnum;
}
