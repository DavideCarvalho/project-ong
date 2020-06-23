import React, { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { CardWithPhoto } from '../../components/card-with-photo';
import { EditPetByIdContext } from '../../pages/ongs/pets/edit/[id]';
import { SelectPetType } from '../../components/select-pet-type';
import { InlineInputField } from '../../components/inline-input-field';
import { InlineTextAreaField } from '../../components/inline-text-area-field';
import { InlineField } from '../../components/inline-field';

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
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    setValues,
    setFieldValue,
  } = useFormik({
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
    setValues({
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
      setFieldValue('file', reader.result);
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
          petName={values.name}
          petImageUrl={values.file || values.currentFile}
          petDescription={values.description}
          ongPhone={data.ong.phone}
        />
      </div>
      <div className="column is-three-quarters">
        <form onSubmit={handleSubmit}>
          <InlineInputField
            label={'Nome'}
            handleChange={handleChange}
            error={errors.name}
            value={values.name}
            name={'name'}
            type={'text'}
          />
          <InlineTextAreaField
            label={'Descrição'}
            handleChange={handleChange}
            error={errors.description}
            value={values.description}
            name={'description'}
          />
          <InlineField label={'Foto do pet'} error={errors.file}>
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
          </InlineField>
          <InlineField label={'tipo do pet'} error={errors.type}>
            <SelectPetType
              value={values.type}
              onChange={(event) => {
                setFieldValue('type', event.target.value);
              }}
            />
          </InlineField>
          <InlineField label={''} error={null}>
            <button type="submit" className="button is-link">
              Salvar
            </button>
          </InlineField>
        </form>
      </div>
    </div>
  );
};
