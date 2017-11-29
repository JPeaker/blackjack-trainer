import { List } from 'immutable';
import defaultState from './default-state';
import CardUtils from '../utils/card';
import { INITIALIZE_SHOE, DRAW_PLAYER_CARD } from './actions';

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case INITIALIZE_SHOE:
      return Object.assign({}, state, {
        shoe: CardUtils.generateShoe(state.rules.numberOfDecks),
        shoeComplete: false
      });

    case DRAW_PLAYER_CARD:
      if (state.shoe.size > 0) {
        return Object.assign({}, state, {
          playerHand: state.playerHand.unshift(state.shoe.first()),
          shoe: state.shoe.shift()
        });
      }

      return Object.assign({}, state, { shoeComplete: true });

    default:
      return state;
  }
}
