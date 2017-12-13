import { List } from 'immutable';
import defaultState from './default-state';
import CardUtils from '../utils/card';
import GameUtils from '../utils/game';
import {
  INITIALIZE_SHOE,
  START_NEW_HAND,
  DRAW_PLAYER_CARD,
  DRAW_DEALER_CARD,
  STAND_DEALER,
  STAND,
  REWARD_PLAYER
} from './actions';

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
        playerHands: List([{
          cards: List([state.shoe.get(0), state.shoe.get(1)]),
          stood: false
        }]),
        dealerHand: {
          cards: List([state.shoe.get(2), state.shoe.get(3)]),
          stood: false
        },
        shoe: state.shoe.shift().shift().shift().shift()
      });

    case DRAW_PLAYER_CARD:
      if (state.playerHands.get(state.currentPlayerHand).stood) {
        return state;
      }

      if (state.shoe.size > 0) {
        const currentPlayerHand = state.playerHands.get(state.currentPlayerHand);
        const newPlayerHand = Object.assign({}, currentPlayerHand, {
          cards: currentPlayerHand.cards.push(state.shoe.get(0))
        });
        return Object.assign({}, state, {
          playerHands: state.playerHands.set(state.currentPlayerHand, newPlayerHand),
          shoe: state.shoe.shift()
        });
      }

      return state;

    case DRAW_DEALER_CARD:
      if (state.shoe.size > 0) {
        return Object.assign({}, state, {
          dealerHand: {
            cards: state.dealerHand.cards.push(state.shoe.get(0))
          },
          shoe: state.shoe.shift()
        });
      }

      return state;

    case STAND:
      return Object.assign({}, state, {
        playerHands: state.playerHands.set(state.currentPlayerHand, {
          cards: state.playerHands.get(state.currentPlayerHand).cards,
          stood: true
        }),
        currentPlayerHand: (state.currentPlayerHand + 1) % state.playerHands.size
      });

    case STAND_DEALER:
      return Object.assign({}, state, {
        dealerHand: Object.assign({}, state.dealerHand, { stood: true })
      })

    case REWARD_PLAYER:
      if (action.roundResult === GameUtils.HAND_RESULTS.LOSE) {
        return Object.assign({}, state, { bank: state.bank - state.betSize });
      }

      if (action.roundResult === GameUtils.HAND_RESULTS.WIN) {
        return Object.assign({}, state, { bank: state.bank + state.betSize });
      }

      if (action.roundResult === GameUtils.HAND_RESULTS.BLACKJACK) {
        return Object.assign({}, state, { bank: state.bank + (state.betSize * 3 / 2) });
      }

      return state;

    default:
      return state;
  }
}
