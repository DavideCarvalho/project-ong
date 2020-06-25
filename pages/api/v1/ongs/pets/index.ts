import { NextApiRequest, NextApiResponse } from 'next';
import {
  createOngPet,
  getOngPets,
} from '../../../../../back/controller/ong.controller';

// async function parsePetsSnapshot(
//   docs: FirebaseFirestore.QueryDocumentSnapshot<Pet>[]
// ): Promise<PetDTO[]> {
//   let pets: PetDTO[] = [];
//   for (const doc of docs) {
//     const docId = doc.id;
//     const petPhoto = await storage
//       .file(`pets/${doc.id}.jpg`)
//       .getSignedUrl({ action: 'read', expires: '03-17-2025' });
//     const { ongRef, cityRef: petCityRef, typeRef, ...petData } = doc.data();
//     const ongValue = await ongRef.get();
//     const typeValue = await typeRef.get();
//     const { cityRef, ...ongData }: Ong = ongValue.data();
//     const cityValue = await cityRef.get();
//     const pet: PetDTO = {
//       ...petData,
//       id: docId,
//       ong: { ...ongData, city: cityValue.data().name },
//       photoUrl: petPhoto[0],
//       type: typeValue.data().name,
//     };
//     pets = [...pets, pet];
//   }
//   return pets;
// }

const methods = {
  GET: getOngPets,
  POST: createOngPet,
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = methods[req.method];
  if (!method)
    return res.status(501).json({
      message: 'Method not implemented',
    });
  return method(req, res);
  // if (req.method === 'GET') {
  //   const tokenId: string = req.cookies.authToken;
  //   if (!tokenId)
  //     return res.status(401).json({
  //       message: `You don't have permission to access this resource`,
  //     });
  //   try {
  //     const token = await auth.verifySessionCookie(tokenId);
  //     const ongData: FirebaseFirestore.QuerySnapshot<Ong> = (await firestore
  //       .collection('ongs')
  //       .where('email', '==', token.email)
  //       .get()) as FirebaseFirestore.QuerySnapshot<Ong>;
  //     const ongRef = await firestore.collection('ongs').doc(ongData.docs[0].id);
  //     const petsSnapshot: FirebaseFirestore.QuerySnapshot<Pet> = (await firestore
  //       .collection('pets')
  //       .where('ongRef', '==', ongRef)
  //       .where('deleted', '==', false)
  //       .get()) as FirebaseFirestore.QuerySnapshot<Pet>;
  //     const pets = await parsePetsSnapshot(petsSnapshot.docs);
  //     return res.status(200).json(pets);
  //   } catch (e) {
  //     return res.status(401).json({
  //       message: `You don't have permission to access this resource`,
  //     });
  //   }
  // }
  // if (req.method === 'POST') {
  //   const tokenId: string = req.cookies.authToken;
  //   if (!tokenId)
  //     return res.status(401).json({
  //       message: `You don't have permission to access this resource`,
  //     });
  //   let user;
  //   try {
  //     user = await auth.verifySessionCookie(tokenId);
  //   } catch (e) {
  //     return res.status(401).json({
  //       message: `You don't have permission to access this resource`,
  //     });
  //   }
  //   const ongQuery: FirebaseFirestore.QuerySnapshot<Ong> = (await firestore
  //     .collection('ongs')
  //     .where('email', '==', user.email)
  //     .get()) as FirebaseFirestore.QuerySnapshot<Ong>;
  //
  //   const ongData: Ong = ongQuery.docs[0].data();
  //   const typeQuery = await firestore
  //     .collection('animal-types')
  //     .where('name', '==', req.body.type)
  //     .get();
  //   const pet = await firestore.collection('pets').add({
  //     name: req.body.name,
  //     description: req.body.description,
  //     typeRef: typeQuery.docs[0].ref,
  //     ongRef: ongQuery.docs[0].ref,
  //     cityRef: ongData.cityRef,
  //     deleted: false,
  //   });
  //   const image = req.body.file;
  //   const base64EncodedImageString = image.replace(
  //     /^data:image\/\w+;base64,/,
  //     ''
  //   );
  //   const mimeType = image.match(
  //     /data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/
  //   )[1];
  //   const imageBuffer = new Buffer(base64EncodedImageString, 'base64');
  //   await storage.file(`pets/${pet.id}.jpg`).save(imageBuffer, {
  //     metadata: { contentType: mimeType },
  //     validation: 'md5',
  //   });
  //   return res.status(200).json({ message: 'Pet created successfully' });
  // }
};
