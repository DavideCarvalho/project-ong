import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import { CardWithPhoto } from '../../components/card-with-photo';
import PubSub from 'pubsub-js';
import { PetDTO } from '../../../shared/types/dto/pet.dto';
import { getPets } from '../../service/get-pets.service';
import { Box, SimpleGrid } from '@chakra-ui/react';

interface Props {
  pets?: PetDTO[];
}

export const PetsListContainer: React.FC<Props> = ({ pets: petsProps }) => {
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
  const { data: pets, error } = useSWR<PetDTO[], AxiosError>(
    ['/api/v1/pets', cities],
    getPets,
    { initialData: petsProps }
  );
  if (error)
    return <div className="has-text-centered">Erro ao carregar os pets</div>;
  if (!pets) return <div className="has-text-centered">Carregando os pets</div>;
  return (
    <SimpleGrid columns={{ sm: 3, md: 4, lg: 5 }} spacing={10}>
      {pets.map((pet: PetDTO) => (
        <Box key={pet.id}>
          <CardWithPhoto
            petDescription={pet.description}
            petImageUrl={pet.photoUrl}
            petName={pet.name}
            ongName={pet.ong.name}
            ongPhone={pet.ong.phone}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};
