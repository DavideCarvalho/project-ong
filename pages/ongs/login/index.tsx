import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { firebaseInstance } from '../../../utils/firebase';
import { InlineInputField } from '../../../components/inline-input-field';

const login = (url: string, idToken: string) => {
  return fetch(`${url}`, {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ idToken }),
  }).then((res) => res.json());
};

interface LoginForm {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  password: Yup.string().required('Senha é obrigatória'),
});

const OngsLoginPage = () => {
  const router = useRouter();
  const { handleSubmit, handleChange, values, errors } = useFormik<LoginForm>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    async onSubmit({ email, password }: LoginForm) {
      const { auth } = firebaseInstance();
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      const idToken = await user.getIdToken();
      await login('/api/ongs/login', idToken);
      await auth.signOut();
      await router.push('/ongs/pets');
    },
  });
  return (
    <>
      <style jsx global>{`
        html,
        body,
        #__next,
        .container,
        .columns {
          height: 100%;
        }
      `}</style>
      <div className="container">
        <div className="columns is-vcentered is-centered">
          <div
            className="has-text-centered"
            style={{ marginTop: '5%', width: '50%' }}
          >
            <div className="card">
              <div className="card-content">
                <p className="title">D.ONG</p>
                <form onSubmit={handleSubmit}>
                  <InlineInputField
                    name={'email'}
                    value={values.email}
                    error={errors.email}
                    handleChange={handleChange}
                    label={'Email'}
                    type={'email'}
                  />
                  <InlineInputField
                    name={'password'}
                    value={values.password}
                    error={errors.password}
                    handleChange={handleChange}
                    label={'Senha'}
                    type={'password'}
                  />
                  <button className="button is-link" type="submit">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OngsLoginPage;
