import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import Link from 'next/link';
import Rodal from 'rodal';
import { toast } from 'react-toastify';
import { CardWithPhoto } from '../../components/card-with-photo';

const getOngPets = (url: string) => fetch(url).then((res) => res.json());

const deleteOngPet = (url: string, dogId: string) =>
  fetch(`${url}/${dogId}`, { method: 'DELETE' }).then((res) => res.json());

interface Ong {
  name: string;
  email: string;
  phone: string;
}

type PetType = 'dog' | 'cat' | 'other';

interface Pet {
  name: string;
  id: string;
  photoUrl: string;
  description: string;
  ong: Ong;
  type: PetType;
}

const parsePetTypeText = (petType) => {
  if (petType === 'dog') return 'doguinho';
  if (petType === 'cat') return 'gatinho';
  if (petType === 'other') return 'pet';
};

export const OngPetsListContainer: React.FC = () => {
  const [modalState, setModalState] = useState({
    visible: false,
    dogName: '',
    dogId: '',
    petType: '',
  });

  const deletePetHandler = () => {
    deleteOngPet('/api/ongs/pets', modalState.dogId)
      .then(() => {
        toast('Pet deletado!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        });
        setModalState((state) => ({
          ...state,
          visible: false,
          dogName: '',
          dogId: '',
          petType: '',
        }));
        mutate('/api/ongs/pets');
      })
      .catch(() => {
        toast.error(
          `Oh oh! Erro ao apagar o ${parsePetTypeText(modalState.petType)}`,
          {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
          }
        );
        setModalState((state) => ({
          ...state,
          visible: false,
          dogName: '',
          dogId: '',
          petType: '',
        }));
      });
  };

  const { data, error } = useSWR<Pet[]>('/api/ongs/pets', getOngPets);
  if (error)
    return <div className="has-text-centered">Erro ao carregar os pets</div>;
  if (!data) return <div className="has-text-centered">Carregando os pets</div>;
  return (
    <>
      <Rodal
        visible={modalState.visible}
        animation="zoom"
        closeOnEsc
        onClose={() => setModalState((state) => ({ ...state, visible: false }))}
      >
        <div
          className="columns is-centered is-vcentered"
          style={{ height: '100%' }}
        >
          <div className="column">
            <h1 className="title is-4" style={{ color: 'red' }}>
              Excluir {parsePetTypeText(modalState.petType)}?
            </h1>
            <div className="is-vcentered is-centered">
              <div className="is-vcentered is-centered">
                <p className="subtitle is-4 is-vcentered is-centered">
                  Deseja excluir {modalState.visible} {modalState.dogName}?
                </p>
                <button
                  className="button is-danger is-outlined"
                  onClick={deletePetHandler}
                >
                  Sim
                </button>
                <button
                  className="button is-info is-outlined"
                  onClick={() =>
                    setModalState((state) => ({
                      ...state,
                      visible: false,
                    }))
                  }
                >
                  Não
                </button>
              </div>
            </div>
          </div>
        </div>
      </Rodal>
      <div className="columns">
        {Array.isArray(data) &&
          data.map((pet) => (
            <div key={pet.id} className="column is-one-quarter">
              <CardWithPhoto
                petDescription={pet.description}
                petImageUrl={pet.photoUrl}
                petName={pet.name}
                ongName={pet.ong.name}
                ongPhone={pet.ong.phone}
              />
              <div className="columns is-gapless">
                <div className="column is-half">
                  <Link href={`/ongs/pets/edit/${pet.id}`}>
                    <a
                      className="button is-info is-outlined"
                      style={{ width: '100%' }}
                    >
                      <span className="icon" style={{ marginRight: '1px' }}>
                        <i className="material-icons">edit</i>
                      </span>
                      Editar
                    </a>
                  </Link>
                </div>
                <div className="column is-half">
                  <button
                    className="button is-danger is-outlined"
                    style={{ width: '100%' }}
                    onClick={() =>
                      setModalState((state) => ({
                        ...state,
                        visible: true,
                        dogName: pet.name,
                        dogId: pet.id,
                        petType: pet.type,
                      }))
                    }
                  >
                    <span className="icon" style={{ marginRight: '1px' }}>
                      <i className="material-icons">delete</i>
                    </span>
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};