import React from 'react';
import { NextPage } from 'next';
import { EditPetInfoContainer } from '../../../../front/containers/pets/edit-pet-info';

interface Props {
  dogId: string;
}

export const EditPetByIdContext = React.createContext({
  dogId: '',
});

const EditDogPage: NextPage<Props> = ({ dogId }) => {
  return (
    <EditPetByIdContext.Provider value={{ dogId }}>
      <div className="container">
        <div className="has-text-centered" style={{ marginTop: '5%' }}>
          <h1 className="title is-1">Editar seu bichinho</h1>
          <EditPetInfoContainer />
        </div>
      </div>
    </EditPetByIdContext.Provider>
  );
};

EditDogPage.getInitialProps = async (context) => {
  return {
    dogId: context.query.id as string,
  };
};

export default EditDogPage;
