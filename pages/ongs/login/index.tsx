import React, { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { firebaseInstance } from '../../../utils/firebase';
import { InlineInputField } from '../../../components/inline-input-field';

const login = (url: string, idToken: string) => {
  return axios.post(`${url}`, { idToken }).then((res) => res.data);
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const { handleSubmit, handleChange, values, errors } = useFormik<LoginForm>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    async onSubmit({ email, password }: LoginForm) {
      setIsLoading(true);
      setError('');
      const { auth } = firebaseInstance();
      let user;
      try {
        const token = await auth.signInWithEmailAndPassword(email, password);
        user = token.user;
      } catch (e) {
        if (e.code !== 'auth/wrong-password' && e.code !== 'auth/user-not-found') {
          setError('Erro inesperado, por favor, tente novamente');
        }
        if (e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found') {
          setError('Usuário ou senha inválidos');
        }
        setIsLoading(false);
      }
      const idToken = await user.getIdToken();
      await login('/api/v1/ongs/login', idToken);
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
                  <p className="help is-danger" style={{fontSize: '15px'}}>{error}</p>
                  <button
                    className={`button is-link ${
                      isLoading ? 'is-loading' : ''
                    }`}
                    type="submit"
                  >
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
