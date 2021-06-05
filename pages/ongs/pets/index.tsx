import React from 'react';
import { NextPage } from 'next';
import { OngPetsListContainer } from '../../../front/containers/ongs/ong-pet-list';

const OngPetsPage: NextPage = () => {
  return (
    <div className="container">
      <div className="has-text-centered" style={{ marginTop: '5%' }}>
        <h1 className="title is-1">Seus animaiszinhos</h1>
        <OngPetsListContainer />
      </div>
    </div>
  );
};

export default OngPetsPage;
