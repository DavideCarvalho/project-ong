import { NextApiRequest, NextApiResponse } from 'next';
import { firestore } from './config/firebase';

type PetType = 'dog' | 'pet';

interface Pets {
  name: string;
  type: PetType;
}

async function getPets(): Promise<Array<Pets>> {
  const snapshots: FirebaseFirestore.QuerySnapshot = await firestore.collection('pets').get();
  return snapshots.docs.map(doc => doc.data()) as Array<Pets>;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const pets = await getPets();
    res.status(200).json(pets);
  }
};
