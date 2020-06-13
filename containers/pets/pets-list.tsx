import React from 'react';
import useSWR from 'swr';
import { CardWithPhoto } from '../../components/card-with-photo';

const getPets = (url) => fetch(url).then((_) => _.json());

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
  const { data, error } = useSWR<Pet[]>('/api/pets', getPets);
  console.log(data, error);
  if (error)
    return <div className="has-text-centered">Erro ao carregar os pets</div>;
  if (!data) return <div className="has-text-centered">Carregando os pets</div>;
  return (
    <div className="columns">
      {data.map((pet) => (
        <div className="column is-one-quarter">
          <CardWithPhoto
            key={pet.id}
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
