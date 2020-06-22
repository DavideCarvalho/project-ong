import { NextApiRequest, NextApiResponse } from 'next';
import { auth, firestore } from '../config/firebase';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const tokenId: string = req.cookies.authToken;
    if (!tokenId)
      return res.status(401).json({
        message: `You don't have permission to access this resource`,
      });
    let user;
    try {
      user = await auth.verifySessionCookie(tokenId);
    } catch (e) {
      return res.status(401).json({
        message: `You don't have permission to access this resource`,
      });
    }
    const ongRef = await firestore
      .collection('ongs')
      .where('email', '==', user.email)
      .get();

    const ong = ongRef.docs[0].data();
    res.status(200).json({ ...ong, id: ongRef.docs[0].id });
  }
};
