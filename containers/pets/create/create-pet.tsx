import { CardWithPhoto } from '../../../components/card-with-photo';
import { SelectPetType } from '../../../components/select-pet-type';
import React from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import useSWR from "swr";

interface OngData {
  name: string;
  email: string;
  phone: string;
  id: string;
}

const getOngData = (url) =>
  fetch(url).then((res) => res.json());

const createPet = (url, body) => {
  return fetch(url, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export const CreatePetContainer = () => {
  const { data: ong } = useSWR<OngData>('/api/ongs', getOngData);
  const router = useRouter();
  const handleChangePhoto = (event) => {
    if (!event.target.files.length) return;
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      formik.setFieldValue('file', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      file: '',
      type: '',
    },
    onSubmit(values) {
      createPet('/api/ongs/pets', values).then(() => {
        toast('Pet criado!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        });
        router.push(`/ongs/pets`);
      });
    },
  });

  return (
    <div className="has-text-centered columns">
      <div className="column is-one-quarter">
        <CardWithPhoto
          petName={formik.values.name}
          petImageUrl={formik.values.file}
          petDescription={formik.values.description}
          ongName={ong?.name}
          ongPhone={ong?.phone}
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
            <div className="field-label is-normal"></div>
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
