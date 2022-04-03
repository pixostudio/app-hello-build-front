import React from 'react';
import { Link } from 'react-router-dom';
import { PAGE_HOME, IMG_LOGO } from '../../config/constants';
import './styles.scss';

export function Logo(): JSX.Element {

  return (
    <Link to={PAGE_HOME} className="logoPage">
      <img src={IMG_LOGO} alt='logo' className='imgLogo' />
    </Link>
  );
}
