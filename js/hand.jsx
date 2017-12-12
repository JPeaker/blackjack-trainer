import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Card from './card';

export default class Hand extends React.Component {
  static get propTypes() {
    return {
      cards: PropTypes.instanceOf(List),
      hideInitialCard: PropTypes.bool
    };
  }

  static get defaultProps() {
    return {
      cards: List(),
      hideInitialCard: false
    };
  }

  render() {
    let hiddenFirst = !this.props.hideInitialCard;
    // TODO: Remove Math.random()
    return this.props.cards.map((card) => {
      const cardElement = (
        <Card key={Math.random()} rank={card.rank} suit={card.suit} hide={!hiddenFirst} />
      );
      hiddenFirst = true;
      return cardElement;
    });
  }
}
