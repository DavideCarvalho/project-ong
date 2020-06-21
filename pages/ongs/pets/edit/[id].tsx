import React from 'react';
import { NextPage } from 'next';
import { EditDogInfoContainer } from '../../../../containers/pets/edit-dog-info';

interface Props {
  tokenId: string;
  dogId: string;
}

export const EditPetByIdContext = React.createContext({
  tokenId: '',
  dogId: '',
});

const EditDogPage: NextPage<Props> = ({ tokenId, dogId }) => {
  return (
    <EditPetByIdContext.Provider value={{ tokenId, dogId }}>
      <div className="container">
        <div className="has-text-centered" style={{ marginTop: '5%' }}>
          <h1 className="title is-1">Editar seu bichinho</h1>
          <EditDogInfoContainer />
        </div>
      </div>
    </EditPetByIdContext.Provider>
  );
};

EditDogPage.getInitialProps = async (context) => {
  return {
    tokenId: context.query.tokenId as string,
    dogId: context.query.id as string,
  };
};

export default EditDogPage;
