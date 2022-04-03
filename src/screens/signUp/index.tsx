import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Col, Row } from 'antd';
import { Navigate } from 'react-router-dom';
import { IDataUser } from '../../services/user/model';
import { ButtonSubmit, InputForm } from '../../components/forms';
import { PAGE_PROFILE, VAL_EMAIL, VAL_NAME, VAL_USERNAME } from '../../config/constants';
import { LoadingContent } from '../../components/loaders';
import AuthService from '../../services/auth';
import useAuth from '../../hooks/useAuth';
import './styles.scss';
import { redirectProfile } from '../../services/utils';

function SignUp(): JSX.Element {

  const { isLoggedin } = useAuth();
  const [errorSignUp, setErrorSignUp] = useState(false);
  const [errorSignUpMessage, setErrorSignUpMessage] = useState('');

  const initialValues: IDataUser = {
    name: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
  };

  const onSubmit = (data: IDataUser, actions: any) => {
    setTimeout(async () => {
      await AuthService.signUp(data)
        .then((res: any) => {
          return redirectProfile();
        })
        .catch(() => {
          setErrorSignUpMessage('No fue posible registrarte, intenta más tarde')
          setErrorSignUp(true);
          actions.setSubmitting(false);
          actions.resetForm();
          setTimeout(() => {
            setErrorSignUp(false);
          }, 8000);
        });
    }, 500);
  };

  function validateForm(data: IDataUser) {

    let errors: any = {};
    
    if (!data.name) {
      errors.name = "El nombre es obligatorio";
    } else if (!VAL_NAME.test(data.name)) {
      errors.name = "El nombre no es correcto";
    } else if (!data.lastName) {
      errors.lastName = "El apellido es obligatorio";
    } else if (!VAL_NAME.test(data.lastName)) {
      errors.lastName = "El apellido no es correcto";
    } else if (!data.email) {
      errors.email = "El correo es obligatorio";
    } else if (!VAL_EMAIL.test(data.email)) {
      errors.email = "El correo no es correcto";
    } else if (!data.userName) {
      errors.userName = "El nombre de usuario es obligatorio";
    } else if (!VAL_USERNAME.test(data.userName)) {
      errors.userName = "El nombre de usuario no es correcto";
    } else if (!data.password) {
      errors.password = "La contraseña es obligatoria";
    } else {
      errors = {};
    };

    return errors;
  };

  function isDisableButton(values: IDataUser, errors: IDataUser, isSubmitting: boolean): boolean {
    return !!(!values.name || errors.name ||
    !values.lastName || errors.lastName ||
    !values.email || errors.email ||
    !values.userName || errors.userName ||
    !values.password || errors.password ||
    isSubmitting);
  }

  if (isLoggedin) {
    return <Navigate to={PAGE_PROFILE} />
  }

  return (
    <div className='signUp'>
      <h1>Regístrate</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validateForm}
      >
        {( { values, touched, isSubmitting, errors, handleSubmit } ) => (
          <Form className='form'>
            <Row className='fields' gutter={16}>
              <Col xs={24} sm={12}>
                <Field
                  as={InputForm}
                  name="name"
                  type="text"
                  required
                  label="Nombre"
                  error={touched.name && errors.name}
                  textError={errors.name}
                />
              </Col>
              <Col xs={24} sm={12}>
                <Field
                  as={InputForm}
                  name="lastName"
                  type="text"
                  required
                  label="Apellido"
                  error={touched.lastName && errors.lastName}
                  textError={errors.lastName}
                />
              </Col>
            </Row>
            <Row className='fields' gutter={16}>
              <Col xs={24}>
                <Field
                  as={InputForm}
                  name="email"
                  type="email"
                  required
                  label="Correo electrónico"
                  error={touched.email && errors.email}
                  textError={errors.email}
                />
              </Col>
            </Row>
            <Row className='fields' gutter={16}>
              <Col xs={24} sm={12}>
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
              <Col xs={24} sm={12}>
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
            <Row gutter={16}>
              <Col span={6} offset={9}>
                <Field
                  as={ButtonSubmit}
                  name="submit"
                  type="submit"
                  disable={isDisableButton(values, errors, isSubmitting)}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? <LoadingContent /> : 'Registrarme'}
                </Field>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
      {errorSignUp && <p className="error">{errorSignUpMessage}</p>}
    </div>
  );
}

export default SignUp;
