import { List } from 'immutable';
import defaultState from './default-state';
import CardUtils from '../utils/card';
import { INITIALIZE_SHOE, START_NEW_HAND, DRAW_PLAYER_CARD, DRAW_DEALER_CARD, STAND_DEALER, STAND } from './actions';

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case INITIALIZE_SHOE:
      return Object.assign({}, state, {
        shoe: CardUtils.generateShoe(state.numberOfDecks)
      });

    case START_NEW_HAND:
      if (state.shoe.size < 4) {
        return state;
      }

      return Object.assign({}, state, {
        playerCards: List([state.shoe.get(0), state.shoe.get(1)]),
        playerStood: false,
        dealerCards: List([state.shoe.get(2), state.shoe.get(3)]),
        dealerStood: false,
        shoe: state.shoe.shift().shift().shift().shift()
      });

    case DRAW_PLAYER_CARD:
      if (state.playerStood) {
        return state;
      }

      if (state.shoe.size > 0) {
        return Object.assign({}, state, {
          playerCards: state.playerCards.push(state.shoe.get(0)),
          shoe: state.shoe.shift()
        });
      }

      return state;

    case DRAW_DEALER_CARD:
      if (state.shoe.size > 0) {
        return Object.assign({}, state, {
          dealerCards: state.dealerCards.push(state.shoe.get(0)),
          shoe: state.shoe.shift()
        });
      }

      return state;

    case STAND:
      if (state.playerStood) {
        return state;
      }

      return Object.assign({}, state, { playerStood: true });

    case STAND_DEALER:
      return Object.assign({}, state, { dealerStood: true });

    default:
      return state;
  }
}
