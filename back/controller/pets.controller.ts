import { NextApiRequest, NextApiResponse } from 'next';
import {
  getAllPets,
  getPetsByCities,
  getPetById as getById,
  editPetById as editById,
  deletePetById as deleteById,
} from '../service/pets.service';
import { PetDTO } from '../../types/dto/pet.dto';

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
  res: NextApiResponse<PetDTO>
) => {
  res.status(200).json(await getById(req.query.id as string));
};

export const deletePetById = async (
  req: NextApiRequest,
  res: NextApiResponse<PetDTO>
) => {
  res.status(200).json(await deleteById(req.query.id as string));
};

export const editPetById = async (
  req: NextApiRequest,
  res: NextApiResponse<PetDTO>
) => {
  res.status(200).json(await editById(req.query.id as string, req.body));
};
