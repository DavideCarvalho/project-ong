import React from 'react';
import { OngPetsListContainer } from '../../../front/containers/ongs/ong-pet-list';
import { NextPage } from 'next';
import '../../../front/containers/ongs/ong-pet-list'

interface Props {}

const OngPetsPage: NextPage<Props> = () => {
  return (
    <div className="container">
      <div className="has-text-centered" style={{ marginTop: '5%' }}>
        <h1 className="title is-1">Seus bichanos</h1>
        <OngPetsListContainer />
      </div>
    </div>
  );
};

export default OngPetsPage;
