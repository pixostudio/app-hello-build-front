import React, { useEffect } from 'react';
import AuthService from '../../services/auth';
import { redirectHome } from '../../services/utils';
import './styles.scss';

function LogOut(): JSX.Element {

  useEffect(() => {
    setTimeout(() => {
      AuthService.logout();
      redirectHome();
    }, 1500);
  }, []);
  

  return (
    <div className="logOut">
      <h2>Hasta pronto</h2>
    </div>
  );
}

export default LogOut;
