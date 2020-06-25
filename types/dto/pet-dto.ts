import { OngDTO } from './ong-dto';
import { PetTypeName } from '../domain/animal-type';

export interface PetDTO {
  name: string;
  id: string;
  description: string;
  photoUrl: string;
  ong: OngDTO;
  type: PetTypeName;
}
