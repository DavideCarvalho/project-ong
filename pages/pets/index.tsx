import React, { useEffect } from 'react';
import { PetsListContainer } from '../../front/containers/pets/pets-list';
import { SearchForm } from '../../front/containers/pets/search-form';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { mutate } from 'swr';
import { getAllPets } from '../../back/service/pets.service';
import { PetDTO } from '../../shared/types/dto/pet.dto';

const PetsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  pets,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="container">
      <div className="has-text-centered" style={{ marginTop: '5%' }}>
        <h1 className="title is-1">DONG</h1>
      </div>
      <div style={{ marginTop: '5%' }}>
        <SearchForm />
      </div>
      <div style={{ marginTop: '5%' }}>
        <PetsListContainer pets={pets} />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{ pets: PetDTO[] }> = async (
  context
) => {
  const pets = await getAllPets();
  return {
    props: {
      pets,
    },
  };
};

export default PetsPage;
