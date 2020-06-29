import { AnimalType } from './animal-type';
import { Ong } from './ong';
import { City } from './city';

export interface Pet {
  name: string;
  description: string;
  deleted: boolean;
  typeRef: FirebaseFirestore.DocumentReference<AnimalType>;
  ongRef: FirebaseFirestore.DocumentReference<Ong>;
  cityRef: FirebaseFirestore.DocumentReference<City>;
}
