import { NextApiRequest, NextApiResponse } from 'next';
import { firestore } from './config/firebase';

interface City {
  name: string;
}

async function getCities() {
  const cityRef = await firestore.collection('cities').get() as FirebaseFirestore.QuerySnapshot<City>;
  let citiesData = [];
  for (const cityData of cityRef.docs) {
    const data = cityData.data();
    citiesData = [...citiesData, data.name];
  }
  return citiesData;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);
  if (req.method === 'GET') {
    const cities = await getCities();
    res.status(200).json(cities);
  }
};
