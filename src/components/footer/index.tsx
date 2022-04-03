import React from 'react';
import { CREATOR } from '../../config/constants';
import './styles.scss';

function Footer(): JSX.Element {

  return (
    <footer>
      <div className="contentFooter">
        Creado por <a href={`mailto:${CREATOR.email}`} target='_blank' rel="noreferrer" className="author">{CREATOR.name}</a>
      </div>
    </footer>
  );
}

export default Footer;
