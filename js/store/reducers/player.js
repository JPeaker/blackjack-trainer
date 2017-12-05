import { List } from 'immutable';
import defaultState from '../default-state';
import CardUtils from '../../utils/card';
import {
  INITIALIZE_SHOE,
  DRAW_PLAYER_CARD,
  DRAW_DEALER_CARD,
  STAND,
  START_NEW_HAND,
  STOP_DEALER_DRAWING
} from '../actions';
const actionCard = { rank: 'HELP', suit: 'NOT IMPLEMENTED '};
export default function playerReducer(state = defaultState.player, action) {
  switch (action.type) {
    case START_NEW_HAND:
      // if (state.shoe.cards.size < 4) {
      if (false) {
        return state;
      }

      return Object.assign({}, state, {
        cards: List([actionCard, actionCard]),
        stood: false
      });

    case DRAW_PLAYER_CARD:
      if (state.stood) {
        return state;
      }

      if (true) {
      // if (state.shoe.cards.size > 0) {
        //TODO: action.card
        return Object.assign({}, state, {
          cards: state.cards.push(actionCard)
        });
      }

      return state;

    case STAND:
      return Object.assign({}, state, { stood: true });

    default:
      return state;
  }
}
