import { PetTypeNameEnum } from '../../types/enum/pet-type-name.enum';
import { firestore } from '../utils/firebase';
import { AnimalType } from '../../types/domain/animal-type';

export const getAnimalTypeDoc = async (
  type: PetTypeNameEnum
): Promise<FirebaseFirestore.QueryDocumentSnapshot<AnimalType>> => {
  const animalTypeSnapshot: FirebaseFirestore.QuerySnapshot<AnimalType> = (await firestore
    .collection('animal-types')
    .where('name', '==', type)
    .get()) as FirebaseFirestore.QuerySnapshot<AnimalType>;
  return animalTypeSnapshot.docs[0];
};
