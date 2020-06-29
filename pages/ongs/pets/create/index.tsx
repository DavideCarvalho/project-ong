import React from 'react';
import { CreatePetContainer } from '../../../../front/containers/pets/create/create-pet';

const CreatePetPage = () => {
  return (
    <div className="container">
      <div className="has-text-centered" style={{ marginTop: '5%' }}>
        <h1 className="title is-1">Adicionar um bichinho</h1>
        <CreatePetContainer />
      </div>
    </div>
  );
};

export default CreatePetPage;
