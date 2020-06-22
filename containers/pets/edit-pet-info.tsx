import React, { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { CardWithPhoto } from '../../components/card-with-photo';
import { EditPetByIdContext } from '../../pages/ongs/pets/edit/[id]';
import { SelectPetType } from '../../components/select-pet-type';

interface Props {}

type PetTypeName = 'dog' | 'cat' | 'other';

interface Ong {
  name: string;
  email: string;
  phone: string;
}

interface Pet {
  name: string;
  id: string;
  photoUrl: string;
  description: string;
  ong: Ong;
  type: PetTypeName;
}

const getPetById = (url, dogId) =>
  fetch(`${url}/${dogId}`).then((res) => res.json());

const updatePetById = (url, dogId, body) => {
  return fetch(`${url}/${dogId}`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export const EditPetInfoContainer: React.FC<Props> = () => {
  const { dogId } = useContext(EditPetByIdContext);
  const router = useRouter();
  const { data, error } = useSWR<Pet>(
    () => ['/api/ongs/pets', dogId],
    getPetById
  );
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      currentFile: '',
      file: '',
      type: '',
    },
    onSubmit(values) {
      const body = {
        name: values.name,
        description: values.description,
        type: values.type,
      } as any;
      if (values.file) {
        body.file = values.file;
      }
      updatePetById('/api/ongs/pets', dogId, body).then((res) => {
        toast('Pet atualizado!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        });
        router.push(`/ongs/pets`);
      });
    },
  });
  useEffect(() => {
    if (!data) return;
    formik.setValues({
      name: data.name,
      description: data.description,
      currentFile: data.photoUrl,
      file: '',
      type: data.type,
    });
  }, [data]);

  const handleChangePhoto = (event) => {
    if (!event.target.files.length) return;
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      formik.setFieldValue('file', reader.result);
    };
    reader.readAsDataURL(file);
  };
  if (!data) {
    return (
      <div className="has-text-centered columns">
        <p>Carregando seu bichinho</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="has-text-centered columns">
        <p>Erro ao pegar as informações do seu bichinho</p>
      </div>
    );
  }
  return (
    <div className="has-text-centered columns">
      <div className="column is-one-quarter">
        <CardWithPhoto
          ongName={data.ong.name}
          petName={formik.values.name}
          petImageUrl={formik.values.file || formik.values.currentFile}
          petDescription={formik.values.description}
          ongPhone={data.ong.phone}
        />
      </div>
      <div className="column is-three-quarters">
        <form onSubmit={formik.handleSubmit}>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Nome</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Descrição</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <textarea
                    className="textarea"
                    value={formik.values.description}
                    name="description"
                    placeholder="Escreva alguma coisa atrativa sobre o animalzinho"
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Foto do pet</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <div className="file has-name">
                    <label className="file-label">
                      <input
                        onChange={handleChangePhoto}
                        className="file-input"
                        type="file"
                        name="resume"
                      />
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fas fa-upload" />
                        </span>
                        <span className="file-label">Troque a foto do pet</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Tipo do pet</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <div className="is-pulled-left">
                    <SelectPetType
                      value={formik.values.type}
                      onChange={(event) => {
                        formik.setFieldValue('type', event.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label"></label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <div className="is-pulled-left">
                    <div className="is-pulled-left">
                      <button type="submit" className="button is-link">
                        Salvar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
