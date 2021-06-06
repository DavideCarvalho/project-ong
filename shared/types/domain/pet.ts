import { AnimalType } from './animal-type';
import { Ong } from './ong';
import { City } from './city';

export interface Pet {
  name: string;
  description: string;
  deleted: boolean;
  eyes: string;
  breed: string;
  fur: string;
  age: FirebaseFirestore.Timestamp;
  rescuedDate: FirebaseFirestore.Timestamp;
  typeRef: FirebaseFirestore.DocumentReference<AnimalType>;
  ongRef: FirebaseFirestore.DocumentReference<Ong>;
  cityRef: FirebaseFirestore.DocumentReference<City>;
}
