import { auth } from './../../config/firebase';
import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';
import { CookieSerializeOptions } from 'cookie';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const expiresIn = 60 * 60 * 24 * 1 * 1000;
    const sessionCookie = await auth.createSessionCookie(req.body.idToken, {
      expiresIn,
    });
    const options: CookieSerializeOptions = {
      maxAge: expiresIn,
      httpOnly: true,
    };
    setCookie({ res }, 'authToken', sessionCookie, options);
    res.status(200).json({ message: 'success' });
  }
};
