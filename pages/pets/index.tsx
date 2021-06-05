import React from 'react';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { PetsListContainer } from '../../front/containers/pets/pets-list';
import { SearchForm } from '../../front/containers/pets/search-form';
import { getAllPets } from '../../back/service/pets.service';
import { PetDTO } from '../../shared/types/dto/pet.dto';

const PetsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  pets,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Lista de animais</title>
        <meta name="description" content="Lista de bichinhos para adoção!" />
        <meta name="keywords" content="ONG,animais,adoção" />
        <meta name="author" content="Davi de Carvalho" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index,follow" />
        <meta name="rating" content="general" />
      </Head>
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
    </>
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
