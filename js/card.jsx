import React from 'react';

export default ({ rank, suit, hide }) => {
  const src = hide ? 'img/back.png' : `img/${rank}_of_${suit}.png`;
  return <img className="card" src={src} />;
};
