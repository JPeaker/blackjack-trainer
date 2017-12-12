import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import Hand from './hand.jsx';
import HandUtils from './utils/hand';
import {
  drawDealerCard,
  drawPlayerCard,
  initializeShoe,
  stand,
  startNewHand,
  stopDealerDrawing
} from './store/actions';

class Game extends React.Component {
  static get propTypes() {
    return {
      dealerHand: PropTypes.instanceOf(Immutable.List).isRequired,
      dealerStood: PropTypes.bool.isRequired,
      playerHand: PropTypes.instanceOf(Immutable.List).isRequired,
      shoe: PropTypes.instanceOf(Immutable.List).isRequired,
      stood: PropTypes.bool.isRequired,

      hit: PropTypes.func.isRequired,
      drawDealerCard: PropTypes.func.isRequired,
      stand: PropTypes.func.isRequired,
      startNewHand: PropTypes.func.isRequired,
      initializeShoe: PropTypes.func.isRequired,
      stopDealerDrawing: PropTypes.func.isRequired
    };
  }

  render() {
    const playerHandValue = HandUtils.getHandValue(this.props.playerHand);
    const dealerHandValue = HandUtils.getHandValue(this.props.dealerHand);
    const haveWon = !this.props.stood ? '' :
      playerHandValue > dealerHandValue ? 'WIN' :
      playerHandValue === dealerHandValue ? 'PUSH' : 'LOSE';

    return (
      <div>
        <div onClick={this.props.hit}>Hit</div>
        <div onClick={this.props.stand}>Stand</div>
        <div onClick={this.props.startNewHand}>Start New Hand</div>
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

const mapStateToProps = (state) => ({
  playerHand: state.playerCards,
  dealerHand: state.dealerCards,
  dealerStood: state.dealerStood,
  shoe: state.shoe,
  stood: state.playerStood
});

const mapDispatchToProps = (dispatch) => ({
  hit: () => { dispatch(drawPlayerCard()); },
  drawDealerCard: () => { dispatch(drawDealerCard()); },
  stand: () => { dispatch(stand()); },
  startNewHand: () => { dispatch(startNewHand()) },
  initializeShoe: () => { dispatch(initializeShoe()); },
  stopDealerDrawing: () => { dispatch(stopDealerDrawing()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
