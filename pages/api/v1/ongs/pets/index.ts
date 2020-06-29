import { NextApiRequest, NextApiResponse } from 'next';
import {
  createOngPet,
  getOngPets,
} from '../../../../../back/controller/ong.controller';

const methods = {
  GET: getOngPets,
  POST: createOngPet,
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = methods[req.method];
  if (!method)
    return res.status(501).json({
      message: 'Método não implementado',
    });
  return method(req, res);
};
