import {
  getOngByEmail as getByEmail,
  getOngByEmail,
} from '../repository/ong.repository';
import {
  getAll,
  getPetsByCityRef,
  getPetsByOngRef,
  getPetById as getById,
  deletePetById as deleteById,
} from '../repository/pets.repository';
import { getCityByDocId } from '../repository/city.repository';
import { Pet } from '../../types/domain/pet';
import { PetDTO } from '../../types/dto/pet-dto';
import { firestore, storage } from '../../pages/api/config/firebase';
import { Ong } from '../../types/domain/ong';
import { City } from '../../types/domain/city';
import admin from 'firebase-admin';
import { AnimalType } from '../../types/domain/animal-type';
import { getAnimalTypeDoc } from '../repository/animal-types.repository';

export const getAllPets = async () => {
  const petsSnapshot = await getAll();
  return parsePetsSnapshot(petsSnapshot.docs);
};

export const getPetsByCities = async (cities: string[]): Promise<PetDTO[]> => {
  let pets: PetDTO[] = [];
  for (const city of cities) {
    const cityDoc: FirebaseFirestore.DocumentSnapshot<City> = await getCityByDocId(
      city.toLowerCase()
    );
    const {
      docs,
    }: FirebaseFirestore.QuerySnapshot<Pet> = await getPetsByCityRef(
      cityDoc.ref
    );
    const parsedPets = await parsePetsSnapshot(docs);
    pets = [...pets, ...parsedPets];
  }
  return pets;
};

export const getPetsByOngToken = async (
  token: admin.auth.DecodedIdToken
): Promise<PetDTO[]> => {
  const ongDoc = await getOngByEmail(token.email);
  const petSnapshot = await getPetsByOngRef(ongDoc.ref);
  return parsePetsSnapshot(petSnapshot.docs);
};

export const getPetById = async (dogId: string): Promise<PetDTO> => {
  const petDoc: FirebaseFirestore.DocumentSnapshot<Pet> = await getById(dogId);
  const parsedPet: PetDTO[] = await parsePetsSnapshot([
    petDoc,
  ] as FirebaseFirestore.QueryDocumentSnapshot<Pet>[]);
  return parsedPet[0];
};

export const deletePetById = async (dogId: string): Promise<any> => {
  await deleteById(dogId);
  return { message: 'Pet deleted successfully' };
};

export const editPetById = async (
  dogId,
  { name, description, type, file }
): Promise<any> => {
  const petDoc: FirebaseFirestore.DocumentSnapshot<Pet> = await getById(dogId);
  const animalTypeDoc: FirebaseFirestore.QueryDocumentSnapshot<AnimalType> = await getAnimalTypeDoc(
    type
  );
  await firestore
    .collection('pets')
    .doc(dogId)
    .update({
      name: name,
      description: description,
      typeRef: animalTypeDoc.exists ? animalTypeDoc.ref : petDoc.data().typeRef,
    });
  if (file) {
    const image = file;
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
  return { message: 'Pet updated successfully' };
};

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
      ong: { ...ongData, city: cityValue.data().name, id: cityValue.id },
      type: typeValue.data().name,
      photoUrl: petPhoto[0],
    };
    pets = [...pets, pet];
  }
  return pets;
}
