import { NextApiRequest, NextApiResponse } from 'next';
import { firestore } from './config/firebase';

type PetType = 'dog' | 'pet';

interface PetDTO {
  name: string;
  type: PetType;
}

interface PetDTO {
  name: string;
  type: PetType;
  id: string;
}

async function getPets(): Promise<Array<PetDTO>> {
  const snapshots: FirebaseFirestore.QuerySnapshot = await firestore.collection('pets').get();
  return snapshots.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data(),
    }
  }) as Array<PetDTO>;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const pets: Array<PetDTO> = await getPets();
    res.status(200).json(pets);
  }
};
