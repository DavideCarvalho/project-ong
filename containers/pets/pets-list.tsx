import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { CardWithPhoto } from '../../components/card-with-photo';
import PubSub from 'pubsub-js';

const getPets = (url, cities) =>
  fetch(`${url}${cities}`).then((res) => res.json());

interface Ong {
  name: string;
  email: string;
  phone: string;
}

interface Pet {
  name: string;
  id: string;
  photoUrl: string;
  description: string;
  ong: Ong;
}

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
  const { data, error } = useSWR<Pet[]>(['/api/pets', cities], getPets);
  if (error)
    return <div className="has-text-centered">Erro ao carregar os pets</div>;
  if (!data) return <div className="has-text-centered">Carregando os pets</div>;
  return (
    <div className="columns">
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
