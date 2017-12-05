import { List } from 'immutable';
import defaultState from '../default-state';
import CardUtils from '../../utils/card';
import {
  DRAW_DEALER_CARD,
  START_NEW_HAND,
  STOP_DEALER_DRAWING
} from '../actions';

const actionCard = { rank: 'HELP', suit: 'NOT IMPLEMENTED '};
export default function dealerReducer(state = defaultState.dealer, action) {
  switch (action.type) {
    case DRAW_DEALER_CARD:
      // if (state.shoe.cards.size > 0) {
      if (true) {
        //TODO: action.card
        return Object.assign({}, state, { cards: state.cards.push(actionCard) });
      }

      return state;

    case START_NEW_HAND:
      // if (state.shoe.cards.size < 4) {
      if (false) {
        return state;
      }

      return Object.assign({}, state, {
        // cards: List([state.shoe.cards.get(2), state.shoe.cards.get(3)]),
        cards: List([actionCard, actionCard]),
        stood: false
      });

    case STOP_DEALER_DRAWING:
      return Object.assign({}, state, { stood: true });

    default:
      return state;
  }
}
