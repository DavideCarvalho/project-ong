import { getAllCities as getAll } from '../service/city.service';
import { NextApiRequest, NextApiResponse } from 'next';

export const getAllCities = async (
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) => {
  return res.status(200).json(await getAll());
};
