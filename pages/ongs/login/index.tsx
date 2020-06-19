import React from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { firebaseInstance } from '../../../utils/firebase';

interface LoginForm {
  email: string;
  password: string;
}

const OngsLoginPage = () => {
  const router = useRouter();
  const { handleSubmit, handleChange } = useFormik<LoginForm>({
    initialValues: {
      email: '',
      password: '',
    },
    async onSubmit({ email, password }) {
      const { auth } = firebaseInstance();
      const signedIn = await auth.signInWithEmailAndPassword(email, password);
      router.push(`/ongs/pets?tokenId=${await signedIn.user.getIdToken()}`);
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
        <div className="columns is-vcentered">
          <div className="has-text-centered" style={{ marginTop: '5%' }}>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                id="email"
                name="email"
                onInput={handleChange}
              />
              <input
                type="password"
                id="password"
                autoComplete="off"
                name="password"
                onInput={handleChange}
              />
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OngsLoginPage;
