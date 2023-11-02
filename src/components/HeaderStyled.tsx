import cl from './HeaderStyled.module.css';
import logo from '../assets/images/ukraine_stand.png';
import { constantsTexts } from '../commons/constants';
import React from 'react';

const { LOGO_TEXT, SWU_IMG_ALT } = constantsTexts;

const HeaderStyled = () => (
  <header>
    <span className={cl.textLogo}>{LOGO_TEXT}</span>
    <img src={logo} alt={SWU_IMG_ALT} className={cl.swuImg} />
  </header>
);

export default React.memo(HeaderStyled);
