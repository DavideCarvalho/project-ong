import React from 'react';
import { PetsListContainer } from './pets-list.container';

const PetsPage = () => {
  // const {data, error} = useSWR('/api/pets', getPets);
  // console.log(data, error);
  // if (error) return <div>Erro ao carregar os pets</div>
  // if (!data) return <div>Carregando os pets</div>
  return (
    <div className="container">
      <div className="has-text-centered" style={{ marginTop: '5%' }}>
        <h1 className="title is-1">D.ONG</h1>
      </div>
      <PetsListContainer />
    </div>
  );
};

export default PetsPage;
