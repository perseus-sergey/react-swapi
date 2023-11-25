import React from 'react';
import classes from './Loader.module.css';

export const Loader = ({ ...props }) => (
  <div aria-hidden {...props} className={classes.loader}></div>
);

// export const Loader = React.memo(loader);
