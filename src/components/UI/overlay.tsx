import React from 'react';
import './overlay.css';

type Props = {};

const Overlay = (props: Props) => {
  return <div className="overlay">Overlay</div>;
};

export default React.memo(Overlay);
