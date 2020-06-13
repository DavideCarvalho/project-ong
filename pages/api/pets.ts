import { NextApiRequest, NextApiResponse } from 'next';
import { firestore, storage } from './config/firebase';

const gCloudCredentialsBuffer = new Buffer(process.env.GCLOUD_CREDENTIALS, 'base64');
const firebaseDatabaseUrlBuffer = new Buffer(process.env.FIREBASE_DATABASE_URL, 'base64');
const firebaseStorageBucketUrlBuffer = new Buffer(process.env.FIREBASE_STORAGE_BUCKET_NAME, 'base64');

type PetType = 'dog' | 'pet';

interface Ong {
  name: string;
  email: string;
  phone: string;
}

interface Pet {
  name: string;
  type: PetType;
  ongRef: FirebaseFirestore.DocumentReference<Ong>,
  description: string;
}

interface PetDTO {
  name: string;
  type: PetType;
  id: string;
  ong: OngDTO;
  description: string;
  photoUrl: string;
}

interface OngDTO {
  name: string;
  email: string;
  phone: string;
}

async function getPets(): Promise<PetDTO[]> {
  const snapshots: FirebaseFirestore.QuerySnapshot = await firestore
    .collection('pets')
    .get();
  let pets: PetDTO[] = [];
  for (const doc of snapshots.docs) {
    const docId = doc.id;
    const petPhoto = await storage
      .file(`pets/${doc.id}.jpg`)
      .getSignedUrl({ action: 'read', expires: '03-17-2025' });
    const { ongRef, ...petData } = doc.data();
    const ongData = await ongRef.get();
    const pet: PetDTO = {
      ...petData as Pet,
      id: docId,
      ong: ongData.data(),
      photoUrl: petPhoto[0],
    }
    pets = [...pets, pet];
  }
  return pets;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const pets: Array<PetDTO> = await getPets();
    res.status(200).json(pets);
  }
};
