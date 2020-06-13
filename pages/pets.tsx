import React from 'react';
import useSWR from 'swr';

const getPets = url => fetch(url).then(_ => _.json());


const PetsPage = () => {
  const {data, error} = useSWR('/api/pets', getPets);
  console.log(data, error);
  if (error) return <div>Erro ao carregar os pets</div>
  if (!data) return <div>Carregando os pets</div>
  return <div>{JSON.stringify(data)}</div>
}

export default PetsPage;
