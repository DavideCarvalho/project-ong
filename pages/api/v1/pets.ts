import { NextApiRequest, NextApiResponse } from 'next';
import { getAll } from '../../../back/controller/pets.controller';

const methods = {
  GET: getAll,
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = methods[req.method];
  if (!method)
    return res.status(501).json({
      message: 'Method not implemented',
    });
  return method(req, res);
};
