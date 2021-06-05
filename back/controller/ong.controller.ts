import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../utils/firebase';
import { CookieSerializeOptions } from 'cookie';
import { setCookie } from 'nookies';
import { getPetsByOngEmail } from '../service/pets.service';
import {
  getOngByEmail,
  createOngPet as createPet,
} from '../service/ong.service';
import { OngDTO } from '../../shared/types/dto/ong.dto';
import { PetDTO } from '../../shared/types/dto/pet.dto';
import { CreatePetSchema } from '../../shared/yup-schemas/create-pet.schema';
import { CreatePetDTO } from '../../shared/types/dto/create-pet.dto';
import { CustomMessageDTO } from '../../shared/types/dto/custom-message.dto';
import admin from 'firebase-admin';
import { NotFoundError } from '../common/error/not-found.error';
import { DomainErrorData } from '../common/error/domain.error';
import { LoginInput } from '../interface/login.input';

const expiresIn = 60 * 60 * 24 * 5 * 1000;
const options: CookieSerializeOptions = {
  maxAge: expiresIn,
  httpOnly: true,
};

export const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { idToken, email }: LoginInput = req.body;
  const ongDoc = getOngByEmail(email);
  if (!ongDoc)
    throw new NotFoundError({
      description: 'Ong not found',
      errorCode: 'ONG_NOT_FOND',
    });
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn,
  });
  setCookie(undefined, 'authToken', sessionCookie, options);
  res.status(200);
};

export const getOngData = async (
  req: NextApiRequest,
  res: NextApiResponse<OngDTO | CustomMessageDTO>
) => {
  let token: admin.auth.DecodedIdToken;
  try {
    const tokenId: string = req.cookies.authToken;
    token = await auth.verifySessionCookie(tokenId);
  } catch (e) {
    return res.status(401).json({
      message: 'Você não tem permissão para acessar esse recurso',
    });
  }
  res.status(200).json(await getOngByEmail(token.email));
};

export const getOngPets = async (
  req: NextApiRequest,
  res: NextApiResponse<PetDTO[] | DomainErrorData>
) => {
  let token: admin.auth.DecodedIdToken;
  try {
    const tokenId: string = req.cookies.authToken;
    token = await auth.verifySessionCookie(tokenId);
  } catch (e) {
    return res.status(401).json({
      description: `You don't have permission to access this resource`,
      errorCode: `PERMISSION_DENIED`,
    });
  }
  try {
    const pets = await getPetsByOngEmail(token.email);
    res.status(200).json(pets);
  } catch (e) {
    if (e instanceof NotFoundError) res.status(404).json(e.data);
  }
};

export const createOngPet = async (
  req: NextApiRequest,
  res: NextApiResponse<PetDTO[] | CustomMessageDTO>
) => {
  let body: CreatePetDTO;
  try {
    body = await CreatePetSchema.validate(req.body);
  } catch (e) {
    return res.status(400).json({ message: e.errors[0] });
  }
  let token;
  try {
    const tokenId: string = req.cookies.authToken;
    token = await auth.verifySessionCookie(tokenId);
  } catch (e) {
    return res.status(401).json({
      message: 'Você não tem permissão para acessar esse recurso',
    });
  }
  res.status(200).json(await createPet(token.email, body));
};
