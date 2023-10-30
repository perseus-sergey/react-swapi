import cl from './HeaderStyled.module.css';
import { constantsLinks, constantsTexts } from '../commons/constants';
import React from 'react';

const { LOGO_TEXT, SWU_IMG_ALT } = constantsTexts;

const { SWU_IMG_PATH } = constantsLinks;

const HeaderStyled = () => (
  <header>
    <span className={cl.textLogo}>{LOGO_TEXT}</span>
    <img src={SWU_IMG_PATH} alt={SWU_IMG_ALT} className={cl.swuImg} />
  </header>
);

export default React.memo(HeaderStyled);
