import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import Hand from './hand';
import HandUtils from './utils/hand';
import {
  drawPlayerCard,
  stand,
  startNewHand,
} from './store/actions';

class Game extends React.Component {
  static get propTypes() {
    return {
      dealerHand: PropTypes.instanceOf(Immutable.List).isRequired,
      playerHand: PropTypes.instanceOf(Immutable.List).isRequired,
      stood: PropTypes.bool.isRequired,

      hit: PropTypes.func.isRequired,
      stand: PropTypes.func.isRequired,
      startNewHand: PropTypes.func.isRequired,
    };
  }

  render() {
    const playerHandValue = HandUtils.getHandValue(this.props.playerHand);
    const dealerHandValue = HandUtils.getHandValue(this.props.dealerHand);
    let haveWon;
    if (!this.props.stood) {
      haveWon = '';
    } else if (playerHandValue > dealerHandValue) {
      haveWon = 'WIN';
    } else if (playerHandValue === dealerHandValue) {
      haveWon = 'PUSH';
    } else {
      haveWon = 'LOSE';
    }

    return (
      <div>
        <button onClick={this.props.hit}>Hit</button>
        <button onClick={this.props.stand}>Stand</button>
        <button onClick={this.props.startNewHand}>Start New Hand</button>
        <Hand cards={this.props.playerHand} />
        <span>{HandUtils.getHandValue(this.props.playerHand)}</span>
        <br />
        <Hand cards={this.props.dealerHand} hideInitialCard={!this.props.stood} />
        <span>{this.props.stood ? HandUtils.getHandValue(this.props.dealerHand) : ''}</span>
        <br />
        <span>{haveWon}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playerHand: state.playerCards,
  dealerHand: state.dealerCards,
  stood: state.playerStood
});

const mapDispatchToProps = dispatch => ({
  hit: () => { dispatch(drawPlayerCard()); },
  stand: () => { dispatch(stand()); },
  startNewHand: () => { dispatch(startNewHand()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
