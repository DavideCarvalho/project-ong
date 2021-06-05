import { PetDTO } from '../../shared/types/dto/pet.dto';
import axios from 'axios';

export const getPets = async (url, cities): Promise<PetDTO[]> => {
  const { data } = await axios.get<PetDTO[]>(`${url}${cities}`);
  return data;
};
