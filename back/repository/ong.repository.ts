import { Ong } from '../../shared/types/domain/ong';
import { firestore } from '../utils/firebase';

export const getOngByEmail = async (
  ongEmail: string
): Promise<FirebaseFirestore.QueryDocumentSnapshot<Ong>> => {
  const ongSnapshot = (await firestore
    .collection('ongs')
    .where('email', '==', ongEmail)
    .get()) as FirebaseFirestore.QuerySnapshot<Ong>;
  return ongSnapshot.docs[0];
};
