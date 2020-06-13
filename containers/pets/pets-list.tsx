import React from 'react';
import useSWR from 'swr';
import { CardWithPhoto } from '../../components/card-with-photo';

const getPets = (url) => fetch(url).then((_) => _.json());

interface Pets {
  name: string;
  id: string;
  photoUrl: string;
  description: string;
}

export const PetsListContainer = () => {
  const { data, error } = useSWR<Pets[]>('/api/pets', getPets);
  console.log(data, error);
  if (error)
    return <div className="has-text-centered">Erro ao carregar os pets</div>;
  if (!data) return <div className="has-text-centered">Carregando os pets</div>;
  return (
    <div className="columns">
      {data.map((pet) => (
        <div className="column is-one-third">
          <CardWithPhoto
            key={pet.id}
            description={pet.description}
            imageUrl={pet.photoUrl}
            name={pet.name}
          />
        </div>
      ))}
    </div>
  );
};
