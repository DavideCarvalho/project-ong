import React from 'react';
import { PetsListContainer } from '../../containers/pets/pets-list';

const PetsPage = () => {
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
