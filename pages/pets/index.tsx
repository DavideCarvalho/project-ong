import React from 'react';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { Center, Heading } from '@chakra-ui/react';
import superjson from 'superjson';
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
      <Center w={'100%'} h={'100%'}>
        <div>
          <div className="has-text-centered" style={{ marginTop: '5%' }}>
            <Heading as="h2" size="3xl" isTruncated>
              D.ONG
            </Heading>
          </div>
          <div style={{ marginTop: '5%' }}>
            <SearchForm />
          </div>
          <div style={{ marginTop: '5%' }}>
            <PetsListContainer pets={superjson.parse<PetDTO[]>(pets)} />
          </div>
        </div>
      </Center>
    </>
  );
};

export const getStaticProps: GetStaticProps<{ pets: string }> = async (
  context
) => {
  const pets = await getAllPets();
  return {
    props: {
      pets: superjson.stringify(pets),
    },
  };
};

export default PetsPage;
