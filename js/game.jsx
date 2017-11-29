import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import Hand from './hand.jsx';
import { drawPlayerCard, initializeShoe } from './store/actions';

class Game extends React.Component {
  static get propTypes() {
    return {
      shoe: PropTypes.instanceOf(Immutable.List)
    };
  }

  static get defaultProps() {
    return {
      shoe: []
    };
  }

  constructor(props) {
    super(props);

    this.props.initializeShoe();
  }

  render() {
    return (
      <div>
        <Hand cards={this.props.shoe} />
        <span>HELLO JOSH</span>
        <Hand cards={this.props.playerHand} />
        <div onClick={this.props.drawCard}>Draw Card</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerHand: state.playerHand,
  shoe: state.shoe
});

const mapDispatchToProps = (dispatch) => ({
  drawCard: () => { dispatch(drawPlayerCard()); },
  initializeShoe: () => { dispatch(initializeShoe()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
