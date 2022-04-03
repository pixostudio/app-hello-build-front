import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Col, Row } from 'antd';
import { Navigate } from 'react-router-dom';
import { IDataUserLogin } from '../../services/user/model';
import { ButtonSubmit, InputForm, SignWithGitHub } from '../../components/forms';
import { LoadingContent } from '../../components/loaders';
import AuthService from '../../services/auth';
import { PAGE_PROFILE } from '../../config/constants';
import './styles.scss';
import useAuth from '../../hooks/useAuth';
import { redirectProfile } from '../../services/utils';

function SignIn(): JSX.Element {

  const { isLoggedin } = useAuth();
  const [errorSignIn, setErrorSignIn] = useState(false);
  const [errorSignInMessage, setErrorSignInMessage] = useState('');

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    if (hasCode) {
      const param = url.split("?code=");
      const code = param[1];
      
      const request = { code };
      setTimeout(async () => {
        await AuthService.signWithGitHub(request)
          .then(() => {
            return redirectProfile();
          })
          .catch(() => {
            setErrorSignInMessage('Ha ocurrido un error, intentalo más tarde')
            setErrorSignIn(true);
            setTimeout(() => {
              setErrorSignIn(false);
            }, 8000);
          });
      }, 500);
    }
  }, []);
  

  const initialValues: IDataUserLogin = {
    userName: '',
    password: '',
  };

  const onSubmit = (data: IDataUserLogin, actions: any) => {
    setTimeout(async () => {
      await AuthService.signIn(data)
        .then(() => {
          return redirectProfile();
        })
        .catch(() => {
          setErrorSignInMessage('Datos erróneos')
          setErrorSignIn(true);
          actions.setSubmitting(false);
          actions.resetForm();
          setTimeout(() => {
            setErrorSignIn(false);
          }, 8000);
        });
    }, 500);
  };

  function validateForm(data: IDataUserLogin) {

    let errors: any = {};
    
    if (!data.userName) {
      errors.userName = "El nombre de usuario es obligatorio";
    } else if (!data.password) {
      errors.password = "La contraseña es obligatoria";
    } else {
      errors = {};
    };

    return errors;
  };

  if (isLoggedin) {
    return <Navigate to={PAGE_PROFILE} />
  }

  return (
    <div className='signIn'>
      <h1>Inicia sesión</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validateForm}
      >
        {( { values, touched, isSubmitting, errors, handleSubmit } ) => (
          <Form className='form'>
            <Row className='fields'>
              <Col span={24}>
                <Field
                  as={InputForm}
                  name="userName"
                  type="text"
                  required
                  label="Nombre de usuario"
                  error={touched.userName && errors.userName}
                  textError={errors.userName}
                />
              </Col>
            </Row>
            <Row className='fields'>
              <Col span={24}>
                <Field
                  as={InputForm}
                  name="password"
                  type="password"
                  required
                  label="Contraseña"
                  error={touched.password && errors.password}
                  textError={errors.password}
                />
              </Col>
            </Row>
            <Row>
              <Col span={8} offset={8}>
                <Field
                  as={ButtonSubmit}
                  name="submit"
                  type="submit"
                  disable={!!(!values.password || !values.userName || isSubmitting)}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? <LoadingContent /> : 'Iniciar sesión'}
                </Field>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
      {errorSignIn && <p className="error">{errorSignInMessage}</p>}
      <p className="alternative">ó inicia sesión con:</p>
      <SignWithGitHub />
    </div>
  );
}

export default SignIn;
