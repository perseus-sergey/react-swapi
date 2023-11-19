import React from 'react';
import classes from './Loader.module.css';

const loader = ({ ...props }) => <div aria-hidden {...props} className={classes.loader}></div>;

export const Loader = React.memo(loader);
