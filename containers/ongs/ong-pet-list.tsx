import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { CardWithPhoto } from '../../components/card-with-photo';
import { firebaseInstance } from '../../utils/firebase';

const getOngPets = (url, tokenId) =>
  fetch(url, { headers: new Headers({ tokenId }) }).then((res) => res.json());

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

export const OngPetsListContainer: React.FC = () => {
  const [userIdToken, setUserIdToken] = useState('');
  const { data, error } = useSWR<Pet[]>(
    ['/api/ongs/pets', userIdToken],
    getOngPets
  );
  useEffect(() => {
    const { auth } = firebaseInstance();
    auth.onIdTokenChanged(async (user) => {
      setUserIdToken(await user.getIdToken());
    });
  }, [data, error]);
  if (error)
    return <div className="has-text-centered">Erro ao carregar os pets</div>;
  if (!data) return <div className="has-text-centered">Carregando os pets</div>;
  return (
    <div className="columns">
      {Array.isArray(data) &&
        data.map((pet) => (
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
