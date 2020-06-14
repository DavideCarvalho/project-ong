import { NextApiRequest, NextApiResponse } from 'next';
import { firestore, storage } from './config/firebase';

const gCloudCredentialsBuffer = new Buffer(
  process.env.GCLOUD_CREDENTIALS,
  'base64'
);
const firebaseDatabaseUrlBuffer = new Buffer(
  process.env.FIREBASE_DATABASE_URL,
  'base64'
);
const firebaseStorageBucketUrlBuffer = new Buffer(
  process.env.FIREBASE_STORAGE_BUCKET_NAME,
  'base64'
);

type PetType = 'dog' | 'pet';

interface City {
  name: string;
}

interface Ong {
  name: string;
  email: string;
  phone: string;
  cityRef: FirebaseFirestore.DocumentReference<City>;
}

interface Pet {
  name: string;
  description: string;
  type: PetType;
  ongRef: FirebaseFirestore.DocumentReference<Ong>;
  cityRef: FirebaseFirestore.DocumentReference<City>;
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
  city: string;
}

async function parsePetsSnapshot(
  docs: FirebaseFirestore.QueryDocumentSnapshot<Pet>[]
): Promise<PetDTO[]> {
  let pets: PetDTO[] = [];
  for (const doc of docs) {
    const docId = doc.id;
    const petPhoto = await storage
      .file(`pets/${doc.id}.jpg`)
      .getSignedUrl({ action: 'read', expires: '03-17-2025' });
    const { ongRef, cityRef: petCityRef, ...petData } = doc.data();
    const ongValue = await ongRef.get();
    const { cityRef, ...ongData }: Ong = ongValue.data();
    const cityValue = await cityRef.get();
    const pet: PetDTO = {
      ...petData,
      id: docId,
      ong: { ...ongData, city: cityValue.data().name },
      photoUrl: petPhoto[0],
    };
    pets = [...pets, pet];
  }
  return pets;
}

async function getAllPets() {
  const snapshots: FirebaseFirestore.QuerySnapshot<Pet> = (await firestore
    .collection('pets')
    .get()) as FirebaseFirestore.QuerySnapshot<Pet>;
  return parsePetsSnapshot(snapshots.docs);
}

async function getPetsByCities(cities: string[]): Promise<any> {
  let pets = [];
  for (const city of cities) {
    const cityRef: FirebaseFirestore.DocumentReference<City> = firestore
      .collection('cities')
      .doc(city.toLowerCase()) as FirebaseFirestore.DocumentReference<City>;
    const petsSnapshot: FirebaseFirestore.QuerySnapshot<Pet> = (await firestore
      .collection('pets')
      .where('cityRef', '==', cityRef)
      .get()) as FirebaseFirestore.QuerySnapshot<Pet>;
    const parsedPets = await parsePetsSnapshot(petsSnapshot.docs);
    pets = [...pets, ...parsedPets];
  }
  return pets;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    if (!req.query.city) {
      const pets: Array<PetDTO> = await getAllPets();
      return res.status(200).json(pets);
    }
    let cities = !Array.isArray(req.query.city)
      ? [req.query.city]
      : req.query.city;
    const pets: Array<PetDTO> = await getPetsByCities(cities);
    return res.status(200).json(pets);
  }
};
