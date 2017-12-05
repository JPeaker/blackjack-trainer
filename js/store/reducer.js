import { List } from 'immutable';
import defaultState from './default-state';
import CardUtils from '../utils/card';
import {
  INITIALIZE_SHOE,
  DRAW_PLAYER_CARD,
  DRAW_DEALER_CARD,
  STAND,
  START_NEW_HAND,
  STOP_DEALER_DRAWING
} from './actions';

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case INITIALIZE_SHOE:
      return Object.assign({}, state, {
        shoe: CardUtils.generateShoe(state.rules.numberOfDecks),
        shoeComplete: false
      });

    case DRAW_PLAYER_CARD:
      if (state.stood) {
        return state;
      }

      if (state.shoe.size > 0) {
        return Object.assign({}, state, {
          playerHand: state.playerHand.push(state.shoe.first()),
          shoe: state.shoe.shift()
        });
      }

      return Object.assign({}, defaultState, { shoeComplete: true });

    case START_NEW_HAND:
      if (state.shoe.size < 4) {
        return Object.assign({}, defaultState, { shoeComplete: true });
      }

      return Object.assign({}, state, {
        stood: false,
        dealerDrawing: false,
        dealerHand: List([state.shoe.get(0), state.shoe.get(1)]),
        playerHand: List([state.shoe.get(2), state.shoe.get(3)]),
        shoe: state.shoe.shift().shift()
      });

    case DRAW_DEALER_CARD:
      if (state.shoe.size > 0) {
        return Object.assign({}, state, {
          dealerHand: state.dealerHand.push(state.shoe.first()),
          shoe: state.shoe.shift()
        });
      }

      return Object.assign({}, state, { shoeComplete: true });

    case STOP_DEALER_DRAWING:
      return Object.assign({}, state, { dealerDrawing: false });

    case STAND:
      return Object.assign({}, state, { stood: true, dealerDrawing: true });

    default:
      return state;
  }
}
