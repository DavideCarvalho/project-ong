import { getOngByEmail } from '../repository/ong.repository';
import {
  getAll,
  getPetsByCityRef,
  getPetsByOngRef,
  getPetById as getById,
  deletePetById as deleteById,
} from '../repository/pets.repository';
import { getCityByDocId } from '../repository/city.repository';
import { Pet } from '../../shared/types/domain/pet';
import { firestore, storage } from '../utils/firebase';
import { Ong } from '../../shared/types/domain/ong';
import { City } from '../../shared/types/domain/city';
import { AnimalType } from '../../shared/types/domain/animal-type';
import { getAnimalTypeDoc } from '../repository/animal-types.repository';
import { PetDTO } from '../../shared/types/dto/pet.dto';
import { EditPetDTO } from '../../shared/types/dto/edit-pet.dto';
import { NotFoundError } from '../common/error/not-found.error';

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

export const getPetsByOngEmail = async (
  ongEmail: string
): Promise<PetDTO[]> => {
  const ongDoc = await getOngByEmail(ongEmail);
  if (!ongDoc) throw new NotFoundError({ description: 'Ong not found', errorCode: 'ONG_NOT_FOND' })
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
  return { message: 'Pet excluido!' };
};

export const editPetById = async (
  dogId,
  { name, description, type, file }: EditPetDTO
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
  return { message: 'Pet atualizado!' };
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
