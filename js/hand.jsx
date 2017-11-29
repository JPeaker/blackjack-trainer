import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Card from './card.jsx';

export default class Hand extends React.Component {
  static get propTypes() {
    return {
      cards: PropTypes.instanceOf(List)
    };
  }

  render() {
    return this.props.cards.map(
      (card) => {
        return <Card key={Math.random()} rank={card.rank} suit={card.suit} />
      }
    );
  }
}
