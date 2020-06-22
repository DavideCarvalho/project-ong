import { NextApiRequest, NextApiResponse } from 'next';
import { auth, firestore, storage } from '../../config/firebase';

type PetTypeName = 'dog' | 'cat' | 'other';

interface PetType {
  name: PetTypeName;
}

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
  deleted: boolean;
  typeRef: FirebaseFirestore.DocumentReference<PetType>;
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
    const { ongRef, cityRef: petCityRef, typeRef, ...petData } = doc.data();
    const ongValue = await ongRef.get();
    const typeValue = await typeRef.get();
    const { cityRef, ...ongData }: Ong = ongValue.data();
    const cityValue = await cityRef.get();
    const pet: PetDTO = {
      ...petData,
      id: docId,
      ong: { ...ongData, city: cityValue.data().name },
      photoUrl: petPhoto[0],
      type: typeValue.data().name,
    };
    pets = [...pets, pet];
  }
  return pets;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const tokenId: string = req.cookies.authToken;
    if (!tokenId)
      return res.status(401).json({
        message: `You don't have permission to access this resource`,
      });
    try {
      const token = await auth.verifySessionCookie(tokenId);
      const ongData: FirebaseFirestore.QuerySnapshot<Ong> = (await firestore
        .collection('ongs')
        .where('email', '==', token.email)
        .get()) as FirebaseFirestore.QuerySnapshot<Ong>;
      const ongRef = await firestore.collection('ongs').doc(ongData.docs[0].id);
      const petsSnapshot: FirebaseFirestore.QuerySnapshot<Pet> = (await firestore
        .collection('pets')
        .where('ongRef', '==', ongRef)
        .where('deleted', '==', false)
        .get()) as FirebaseFirestore.QuerySnapshot<Pet>;
      const pets = await parsePetsSnapshot(petsSnapshot.docs);
      return res.status(200).json(pets);
    } catch (e) {
      console.log(e);
      return res.status(401).json({
        message: `You don't have permission to access this resource`,
      });
    }
  }
};
