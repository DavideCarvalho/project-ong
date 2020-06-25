import { getAllCities as getAll } from '../repository/city.repository';
import { City } from '../../types/domain/city';

export const getAllCities = async (): Promise<string[]> => {
  const cities = await getAll();
  return parseCities(cities.docs);
};

const parseCities = (
  cities: FirebaseFirestore.QueryDocumentSnapshot<City>[]
) => {
  let citiesData = [];
  for (const city of cities) {
    const data = city.data();
    citiesData = [...citiesData, data.name];
  }
  return citiesData;
};
