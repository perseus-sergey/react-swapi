import React from 'react';
import classes from './Loader.module.css';

const loader = () => <div aria-hidden className={classes.loader}></div>;

export const Loader = React.memo(loader);
