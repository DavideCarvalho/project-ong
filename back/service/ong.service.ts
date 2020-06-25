import { getOngByEmail as getByEmail } from '../repository/ong.repository';
import { Ong } from '../../types/domain/ong';
import { OngDTO } from '../../types/dto/ong-dto';
import { getAnimalTypeDoc } from '../repository/animal-types.repository';
import { AnimalType } from '../../types/domain/animal-type';
import { firestore, storage } from '../../pages/api/config/firebase';
import { Pet } from '../../types/domain/pet';

export const getOngByEmail = async (ongEmail: string): Promise<OngDTO> => {
  const ongDoc: FirebaseFirestore.QueryDocumentSnapshot<Ong> = await getByEmail(
    ongEmail
  );
  const { cityRef, ...ongData } = ongDoc.data();
  const cityDoc = await cityRef.get();
  return { ...ongData, id: ongDoc.id, city: cityDoc.data().name };
};

export const createOngPet = async (
  ongEmail: string,
  { name, description, type, file }
): Promise<any> => {
  const ongDoc: FirebaseFirestore.QueryDocumentSnapshot<Ong> = await getByEmail(
    ongEmail
  );
  const animalTypeDoc: FirebaseFirestore.QueryDocumentSnapshot<AnimalType> = await getAnimalTypeDoc(
    type
  );
  const pet: FirebaseFirestore.DocumentReference<Pet> = (await firestore
    .collection('pets')
    .add({
      name: name,
      description: description,
      typeRef: animalTypeDoc.ref,
      ongRef: ongDoc.ref,
      cityRef: ongDoc.data().cityRef,
      deleted: false,
    })) as FirebaseFirestore.DocumentReference<Pet>;
  const image = file;
  const base64EncodedImageString = image.replace(
    /^data:image\/\w+;base64,/,
    ''
  );
  const mimeType = image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
  const imageBuffer = new Buffer(base64EncodedImageString, 'base64');
  await storage.file(`pets/${pet.id}.jpg`).save(imageBuffer, {
    metadata: { contentType: mimeType },
    validation: 'md5',
  });
  return { message: 'Pet created successfully' };
};
