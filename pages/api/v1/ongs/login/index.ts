import { NextApiRequest, NextApiResponse } from 'next';
import { login } from '../../../../../back/controller/ong.controller';

const methods = {
  POST: login,
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  methods[req.method](req, res);
};
