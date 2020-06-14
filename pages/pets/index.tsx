import React from 'react';
import { PetsListContainer } from '../../containers/pets/pets-list';
import { SearchForm } from '../../containers/pets/search-form';

const PetsPage = () => {
  return (
    <div className="container">
      <div className="has-text-centered" style={{ marginTop: '5%' }}>
        <h1 className="title is-1">DONG</h1>
      </div>
      <div style={{ marginTop: '5%' }}>
        <SearchForm />
      </div>
      <div>
        <PetsListContainer style={{ marginTop: '5%' }} />
      </div>
    </div>
  );
};

export default PetsPage;
