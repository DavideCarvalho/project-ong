import React from 'react';
import useSWR from 'swr';

const PetsPage = () => {
  const [data, error] = useSWR('/api/pets');

  if (error) return <div>Erro ao carregar os pets</div>
  if (!data) return <div>Carregando os pets</div>
  return <div>{JSON.stringify(data)}</div>
}

export default PetsPage;
