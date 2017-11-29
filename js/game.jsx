import React from 'react';
import Hand from './hand.jsx';
import CardUtils from './utils/card';

export default class Game extends React.Component {
  render() {
    return (
      <div>
        <Hand cards={CardUtils.generateShoe(4)} />
        <span>{4}</span>
      </div>
    );
  }
}
