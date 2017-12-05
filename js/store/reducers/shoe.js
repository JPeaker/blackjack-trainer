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

export default function shoeReducer(state = defaultState.shoe, action) {
  switch (action.type) {
    case INITIALIZE_SHOE:
      return Object.assign({}, state, {
        cards: CardUtils.generateShoe(8)
        // cards: CardUtils.generateShoe(state.rules.numberOfDecks)
      });

    case START_NEW_HAND:
      if (state.cards.size < 4) {
        return state;
      }

      // TODO: Don't shift 4 times
      return Object.assign({}, state, {
        shoe: {
          cards: state.cards.shift().shift().shift().shift()
        }
      });

    case DRAW_PLAYER_CARD:
      if (false) {
      // if (state.player.stood) {
        return state;
      }

      if (state.cards.size > 0) {
        return Object.assign({}, state, {
          cards: state.shoe.cards.shift()
        });
      }

      return state;

    case DRAW_DEALER_CARD:
      if (state.cards.size > 0) {
        return Object.assign({}, state, {
          cards: state.cards.shift()
        });
      }

      return state;

    default:
      return state;
  }
}
