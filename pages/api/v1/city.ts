import { NextApiRequest, NextApiResponse } from 'next';
import { getAllCities } from '../../../back/controller/city.controller';

const methods = {
  GET: getAllCities,
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = methods[req.method];
  if (!method)
    return res.status(501).json({
      message: 'Método não implementado',
    });
  return method(req, res);
};
