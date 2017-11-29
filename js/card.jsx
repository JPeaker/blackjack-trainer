import React from 'react';

export default ({ rank, suit }) => <img className="card" src={`img/${rank}_of_${suit}.png`} />;
