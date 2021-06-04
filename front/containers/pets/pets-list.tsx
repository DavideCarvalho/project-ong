import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import useSWR from 'swr';
import { CardWithPhoto } from '../../components/card-with-photo';
import PubSub from 'pubsub-js';
import { PetDTO } from '../../../shared/types/dto/pet.dto';

const getPets = async (url, cities): Promise<PetDTO[]> => {
  const { data } = await axios.get<PetDTO[]>(`${url}${cities}`);
  return data;
};

export const PetsListContainer = () => {
  const [cities, setCities] = useState('');
  useEffect(() => {
    PubSub.subscribe(
      '[PETS DASHBOARD] Change Cities',
      (message: string, cities: string[]) => {
        if (!cities || !cities.length) {
          setCities('');
          return;
        }
        const queryString = cities.reduce(
          (acc, city) => `${acc}city=${city}&`,
          '?'
        );
        setCities(queryString);
      }
    );
  }, []);
  const { data, error } = useSWR<PetDTO[], AxiosError>(
    ['/api/v1/pets', cities],
    getPets
  );
  if (error)
    return <div className="has-text-centered">Erro ao carregar os pets</div>;
  if (!data) return <div className="has-text-centered">Carregando os pets</div>;
  return (
    <div className="columns is-multiline">
      {data.map((pet) => (
        <div key={pet.id} className="column is-one-quarter">
          <CardWithPhoto
            petDescription={pet.description}
            petImageUrl={pet.photoUrl}
            petName={pet.name}
            ongName={pet.ong.name}
            ongPhone={pet.ong.phone}
          />
        </div>
      ))}
    </div>
  );
};
