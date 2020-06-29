import { NextApiRequest, NextApiResponse } from 'next';
import {
  deletePetById as deleteById,
  editPetById as editById,
  getAllPets,
  getPetById as getById,
  getPetsByCities,
} from '../service/pets.service';
import { PetDTO } from '../../shared/types/dto/pet.dto';
import { auth } from '../utils/firebase';
import { EditPetDTO } from '../../shared/types/dto/edit-pet.dto';
import { EditPetSchema } from '../../shared/yup-schemas/edit-pet.schema';
import { CustomMessageDTO } from '../../shared/types/dto/custom-message.dto';

export const getAll = async (
  req: NextApiRequest,
  res: NextApiResponse<PetDTO[]>
) => {
  if (!req.query.city) {
    const pets: PetDTO[] = await getAllPets();
    return res.status(200).json(pets);
  }
  let cities = !Array.isArray(req.query.city)
    ? [req.query.city]
    : req.query.city;
  const pets: Array<PetDTO> = await getPetsByCities(cities);
  return res.status(200).json(pets);
};

export const getPetById = async (
  req: NextApiRequest,
  res: NextApiResponse<PetDTO | CustomMessageDTO>
) => {
  try {
    const tokenId: string = req.cookies.authToken;
    await auth.verifySessionCookie(tokenId);
  } catch (e) {
    return res.status(401).json({
      message: 'Você não tem permissão para acessar esse recurso',
    });
  }
  res.status(200).json(await getById(req.query.id as string));
};

export const deletePetById = async (
  req: NextApiRequest,
  res: NextApiResponse<PetDTO | CustomMessageDTO>
) => {
  try {
    const tokenId: string = req.cookies.authToken;
    await auth.verifySessionCookie(tokenId);
  } catch (e) {
    return res.status(401).json({
      message: 'Você não tem permissão para acessar esse recurso',
    });
  }
  res.status(200).json(await deleteById(req.query.id as string));
};

export const editPetById = async (
  req: NextApiRequest,
  res: NextApiResponse<PetDTO | CustomMessageDTO>
) => {
  let body: EditPetDTO;
  try {
    body = await EditPetSchema.validate(req.body);
  } catch (e) {
    return res.status(400).json({ message: e.errors[0] });
  }
  try {
    const tokenId: string = req.cookies.authToken;
    await auth.verifySessionCookie(tokenId);
  } catch (e) {
    return res.status(401).json({
      message: 'Você não tem permissão para acessar esse recurso',
    });
  }
  res.status(200).json(await editById(req.query.id as string, body));
};
