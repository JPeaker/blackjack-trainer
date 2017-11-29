import React from 'react';
import PropTypes from 'prop-types';
import Card from './card.jsx';

export default class Hand extends React.Component {
  static get propTypes() {
    return {
      cards: PropTypes.array
    };
  }

  render() {
    return this.props.cards.map((card) => <Card key={Math.random()} rank={card.rank} suit={card.suit} />);
  }
}
