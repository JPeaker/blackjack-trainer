import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import Hand from './hand';
import HandUtils from './utils/hand';
import GameUtils from './utils/game';
import StoreUtils from './store/utils';
import {
  drawPlayerCard,
  doubleHand,
  stand,
  startNewHand,
} from './store/actions';

class Game extends React.Component {
  static get propTypes() {
    return {
      dealerHand: PropTypes.object.isRequired,
      playerHands: PropTypes.instanceOf(Immutable.List).isRequired,
      stood: PropTypes.bool.isRequired,
      bank: PropTypes.number.isRequired,

      hit: PropTypes.func.isRequired,
      stand: PropTypes.func.isRequired,
      doubleHand: PropTypes.func.isRequired,
      startNewHand: PropTypes.func.isRequired,
    };
  }

  render() {
    return (
      <div>
        <button onClick={this.props.hit}>Hit</button>
        <button onClick={this.props.stand}>Stand</button>
        <button onClick={this.props.doubleHand}>Double</button>
        <button onClick={this.props.startNewHand}>Start New Hand</button>
        <br />
        {
          this.props.playerHands.map(hand => { return [
            <Hand key={Math.random()} hand={hand} />,
            <br />,
            `Player hand value: ${HandUtils.getHandValue(hand)}`,
            <br />,
            `Bet size: ${hand.bet}`]; })
        }
        <br />
        <Hand hand={this.props.dealerHand} hideInitialCard={!this.props.stood} />
        <span>{this.props.stood ? HandUtils.getHandValue(this.props.dealerHand) : ''}</span>
        <br />
        <span>{!this.props.stood ? '' : GameUtils.scoreRound(this.props.playerHands.get(0), this.props.dealerHand)}</span>
        <br />
        <span>{this.props.bank}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playerHands: state.playerHands,
  dealerHand: state.dealerHand,
  stood: StoreUtils.getPlayerHand(state).stood,
  bank: state.bank
});

const mapDispatchToProps = dispatch => ({
  hit: () => { dispatch(drawPlayerCard()); },
  doubleHand: () => { dispatch(doubleHand()); },
  stand: () => { dispatch(stand()); },
  startNewHand: () => { dispatch(startNewHand()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
