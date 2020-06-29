import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { CardWithPhoto } from '../../../components/card-with-photo';
import { SelectPetType } from '../../../components/select-pet-type';
import * as Yup from 'yup';
import { InlineInputField } from '../../../components/inline-input-field';
import { InlineTextAreaField } from '../../../components/inline-text-area-field';
import { InlineField } from '../../../components/inline-field';
import { PetTypeNameEnum } from '../../../../shared/types/enum/pet-type-name.enum';
import { OngDTO } from '../../../../shared/types/dto/ong.dto';
import { CreatePetDTO } from '../../../../shared/types/dto/create-pet.dto';
import { CreatePetSchema } from '../../../../shared/yup-schemas/create-pet.schema';

interface CreatePetForm {
  name: string;
  description: string;
  file: string;
  type: PetTypeNameEnum;
}

const getOngData = (url): Promise<OngDTO> =>
  axios.get<OngDTO>(url).then((res: AxiosResponse<OngDTO>) => res.data);

const createPet = (url: string, body: CreatePetDTO) => {
  return axios.post(url, body).then((res) => res.data);
};

export const CreatePetContainer = () => {
  const { data: ong } = useSWR<OngDTO>('/api/v1/ongs', getOngData);
  const router = useRouter();
  const handleChangePhoto = (event) => {
    if (!event.target.files.length) return;
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setFieldValue('file', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    setFieldValue,
  } = useFormik<CreatePetForm>({
    initialValues: {
      name: '',
      description: '',
      file: '',
      type: PetTypeNameEnum.dog,
    },
    validationSchema: CreatePetSchema,
    async onSubmit(values: CreatePetForm) {
      await createPet('/api/v1/ongs/pets', values);
      toast('Pet criado!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      await router.push(`/ongs/pets`);
    },
  });

  return (
    <div className="has-text-centered columns">
      <div className="column is-one-quarter">
        <CardWithPhoto
          petName={values.name}
          petImageUrl={values.file}
          petDescription={values.description}
          ongName={ong?.name}
          ongPhone={ong?.phone}
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
