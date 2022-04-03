import React from 'react';
import { Link } from 'react-router-dom';
import { MENU_NOT_SESSION, MENU_SESSION } from '../../config/constants';
import useAuth from '../../hooks/useAuth';
import { Logo } from '../logos';
import './styles.scss';

export function NavBar(): JSX.Element {

  const { isLoggedin } = useAuth();
  

  return (
    <nav className="nav">
      <Logo />
      <div className="menu">
        <Menu menu={isLoggedin ? MENU_SESSION : MENU_NOT_SESSION} />
      </div>
    </nav>
  );
}

function Menu( props: { menu: Array<any> } ): JSX.Element {

  const { menu } = props;

  return (
    <ul>
      {menu.map((i: any) => (
        <li key={i.id} className="itemMenu">
          <Link to={i.link}>
            <p className='titlesText'>{i.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

