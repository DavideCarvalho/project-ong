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
  ongRef: FirebaseFirestore.DocumentReference<Ong>;
  cityRef: FirebaseFirestore.DocumentReference<City>;
  typeRef: FirebaseFirestore.DocumentReference<PetType>;
}

interface PetDTO {
  name: string;
  type: PetTypeName;
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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const tokenId: string = req.cookies.authToken;
    if (!tokenId)
      return res.status(401).json({
        message: `You don't have permission to access this resource`,
      });
    try {
      await auth.verifySessionCookie(tokenId);
      const dogId: string = req.query.id as string;
      if (!dogId)
        return res.status(400).json({
          message: 'ID is empty',
        });
      const petDoc: FirebaseFirestore.DocumentSnapshot<Pet> = (await firestore
        .collection('pets')
        .doc(dogId)
        .get()) as FirebaseFirestore.DocumentSnapshot<Pet>;
      if (!petDoc.exists)
        return res.status(404).json({
          message: 'Pet not found',
        });
      const docId = petDoc.id;
      const petPhoto = await storage
        .file(`pets/${docId}.jpg`)
        .getSignedUrl({ action: 'read', expires: '03-17-2025' });
      const {
        ongRef,
        cityRef: petCityRef,
        typeRef,
        ...petData
      } = petDoc.data();
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
      return res.json(pet);
    } catch (e) {
      return res.status(401).json({
        message: `You don't have permission to access this resource`,
      });
    }
  }
  if (req.method === 'PUT') {
    const tokenId: string = req.cookies.authToken;
    if (!tokenId)
      return res.status(401).json({
        message: `You don't have permission to access this resource`,
      });
    try {
      await auth.verifySessionCookie(tokenId);
    } catch (e) {
      return res.status(401).json({
        message: `You don't have permission to access this resource`,
      });
    }
    const dogId: string = req.query.id as string;
    if (!dogId)
      return res.status(400).json({
        message: 'ID is empty',
      });
    const petDoc: FirebaseFirestore.DocumentSnapshot<Pet> = (await firestore
      .collection('pets')
      .doc(dogId)
      .get()) as FirebaseFirestore.DocumentSnapshot<Pet>;
    if (!petDoc.exists)
      return res.status(404).json({
        message: 'Pet not found',
      });
    const animalsTypeSnapshot = await firestore
      .collection('animals-type')
      .where('name', '==', req.body.type)
      .get();
    const animalsTypeDoc = animalsTypeSnapshot.docs[0];
    const petData = {
      name: req.body.name || petDoc.data().name,
      description: req.body.description || petDoc.data().description,
      typeRef: animalsTypeDoc
        ? firestore.collection('animals-type').doc(animalsTypeDoc.id)
        : petDoc.data().typeRef,
      ongRef: petDoc.data().ongRef,
      cityRef: petDoc.data().cityRef,
    };
    await firestore.collection('pets').doc(petDoc.id).update(petData);
    if (req.body.file) {
      const image = req.body.file;
      const base64EncodedImageString = image.replace(
        /^data:image\/\w+;base64,/,
        ''
      );
      const mimeType = image.match(
        /data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/
      )[1];
      const imageBuffer = new Buffer(base64EncodedImageString, 'base64');
      await storage.file(`pets/${dogId}.jpg`).save(imageBuffer, {
        metadata: { contentType: mimeType },
        validation: 'md5',
      });
    }
    return res.status(200).json({ message: 'Pet updated successfully' });
  }
  if (req.method === 'DELETE') {
    const tokenId: string = req.cookies.authToken;
    if (!tokenId)
      return res.status(401).json({
        message: `You don't have permission to access this resource`,
      });
    try {
      await auth.verifySessionCookie(tokenId);
    } catch (e) {
      return res.status(401).json({
        message: `You don't have permission to access this resource`,
      });
    }
    const dogId: string = req.query.id as string;
    if (!dogId)
      return res.status(400).json({
        message: 'ID is empty',
      });
    await firestore.collection('pets').doc(dogId).update({ deleted: true });
    return res.status(200).json({ message: 'Pet deleted successfully' });
  }
};
