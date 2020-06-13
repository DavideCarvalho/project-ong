import { NextApiRequest, NextApiResponse } from 'next';
import { firestore } from './config/firebase';

type PetType = 'dog' | 'pet';

interface Pets {
  name: string;
  type: PetType;
}

async function getPets(): Promise<Array<FirebaseFirestore.QueryDocumentSnapshot<Pets>>> {
  const data = await firestore.collection('/pets').get();
  return data.docs as Array<FirebaseFirestore.QueryDocumentSnapshot<Pets>>;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const pets = await getPets();
    res.status(200).json(pets);
  }
};
