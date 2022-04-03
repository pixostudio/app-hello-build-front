import React from 'react';
import { Button, Input } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import './styles.scss';

export interface IForm {
  children?: JSX.Element|JSX.Element[]
  name?: string
  label?: string
  placeholder?: string
  required?: boolean
  error?: boolean
  type?: string
  value?: string
  textError?: string
  disable?: boolean
  onClick?: any
}

export const LabelForm = ( props: IForm ): JSX.Element => {
  const { children, name  } = props;

  return <label htmlFor={name} className="labelForm">{children}</label>;
}

export const ItemForm = ( props: IForm ) => {

  const { children, label, name  } = props;

  return (
    <div className="itemInput">
      {label ?? <LabelForm name={name}>{label}</LabelForm>}
      {children}
    </div>
  )
}

export const InputForm = ( props: IForm ): JSX.Element => {

  const { label, name, error, textError, ...other } = props;

  return (
    <ItemForm label={label} name={name}>
      <Input {...other} name={name} status={error ? 'error' : ''} />
      {error ? <ErrorMessage textError={textError} /> : <span></span>}
    </ItemForm>
  )
}

export const ButtonSubmit = ( props: IForm ): JSX.Element => {

  const { disable, children, onClick } = props;

  return (
    <Button className='button' type="primary" disabled={disable} onClick={onClick} >{children}</Button>
  )
}

export const ErrorMessage = ( props: IForm ): JSX.Element => {

  const { textError } = props;

  return (
    <div className="errorMessage">
      <p>{textError}</p>
    </div>
  )
}

export const SignWithGitHub = (): JSX.Element => {

  const signGithub = async () => {
    const urlBase = process.env.REACT_APP_GITHUB_BASE_URI;
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const redirect = window.location.href;
    const url = `${urlBase}?scope=user&client_id=${clientId}&redirect_uri=${redirect}`;
    window.location.href = url;
  }

  return (
    <Button onClick={signGithub} icon={<GithubOutlined />} size='large'>
      GitHub
    </Button>
  )
}
