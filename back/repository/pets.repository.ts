import { Ong } from '../../types/domain/ong';
import { Pet } from '../../types/domain/pet';
import { firestore } from '../../pages/api/config/firebase';
import { City } from '../../types/domain/city';

export const getAll = async (): Promise<
  FirebaseFirestore.QuerySnapshot<Pet>
> => {
  return (await firestore
    .collection('pets')
    .where('deleted', '==', false)
    .get()) as FirebaseFirestore.QuerySnapshot<Pet>;
};

export const getPetById = async (
  dogId: string
): Promise<FirebaseFirestore.DocumentSnapshot<Pet>> => {
  return (await firestore
    .collection('pets')
    .doc(dogId)
    .get()) as FirebaseFirestore.DocumentSnapshot<Pet>;
};

export const deletePetById = async (
  dogId: string
): Promise<FirebaseFirestore.WriteResult> => {
  return await firestore.collection('pets').doc(dogId).update({ deleted: true });
};


export const getPetsByCityRef = async (
  cityRef: FirebaseFirestore.DocumentReference<City>
): Promise<FirebaseFirestore.QuerySnapshot<Pet>> => {
  return (await firestore
    .collection('pets')
    .where('deleted', '==', false)
    .where('cityRef', '==', cityRef)
    .get()) as FirebaseFirestore.QuerySnapshot<Pet>;
};

export const getPetsByOngRef = async (
  ongRef: FirebaseFirestore.DocumentReference<Ong>
): Promise<FirebaseFirestore.QuerySnapshot<Pet>> => {
  return (await firestore
    .collection('pets')
    .where('deleted', '==', false)
    .where('ongRef', '==', ongRef)
    .get()) as FirebaseFirestore.QuerySnapshot<Pet>;
};
