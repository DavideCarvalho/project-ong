import { firestore } from '../utils/firebase';
import { City } from '../../shared/types/domain/city';

export const getAllCities = async (): Promise<
  FirebaseFirestore.QuerySnapshot<City>
> => {
  return (await firestore
    .collection('cities')
    .get()) as FirebaseFirestore.QuerySnapshot<City>;
};

export const getCityByDocId = async (
  docId: string
): Promise<FirebaseFirestore.DocumentSnapshot<City>> => {
  return (await firestore
    .collection('cities')
    .doc(docId.toLowerCase())
    .get()) as FirebaseFirestore.DocumentSnapshot<City>;
};
