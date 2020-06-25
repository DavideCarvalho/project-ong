import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../utils/firebase';
import { CookieSerializeOptions } from 'cookie';
import { setCookie } from 'nookies';
import { getPetsByOngToken } from '../service/pets.service';
import {
  getOngByEmail,
  createOngPet as createPet,
} from '../service/ong.service';
import { OngDTO } from '../../types/dto/ong.dto';
import { PetDTO } from '../../types/dto/pet.dto';

const expiresIn = 60 * 60 * 24 * 5 * 1000;
const options: CookieSerializeOptions = {
  maxAge: expiresIn,
  httpOnly: true,
};

export const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const sessionCookie = await auth.createSessionCookie(req.body.idToken, {
    expiresIn,
  });
  setCookie({ res }, 'authToken', sessionCookie, options);
  res.status(200).json({ message: 'success' });
};

export const getOngData = async (
  req: NextApiRequest,
  res: NextApiResponse<OngDTO>
) => {
  const tokenId: string = req.cookies.authToken;
  const token = await auth.verifySessionCookie(tokenId);
  res.status(200).json(await getOngByEmail(token.email));
};

export const getOngPets = async (
  req: NextApiRequest,
  res: NextApiResponse<PetDTO[]>
) => {
  const tokenId: string = req.cookies.authToken;
  const token = await auth.verifySessionCookie(tokenId);
  res.status(200).json(await getPetsByOngToken(token));
};

export const createOngPet = async (
  req: NextApiRequest,
  res: NextApiResponse<PetDTO[]>
) => {
  const tokenId: string = req.cookies.authToken;
  const token = await auth.verifySessionCookie(tokenId);
  res.status(200).json(await createPet(token.email, req.body));
};
