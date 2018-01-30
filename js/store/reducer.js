import { List } from 'immutable';
import defaultState from './default-state';
import CardUtils from '../utils/card';
import HandUtils from '../utils/hand';
import GameUtils from '../utils/game';
import StoreUtils from '../store/utils';
import {
  INITIALIZE_SHOE,
  START_NEW_HAND,
  DRAW_PLAYER_CARD,
  DRAW_DEALER_CARD,
  STAND_DEALER,
  STAND,
  REWARD_PLAYER,
  DOUBLE,
  SPLIT
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
          bet: state.betSize,
          stood: false
        }]),
        dealerHand: {
          cards: List([state.shoe.get(2), state.shoe.get(3)]),
          stood: false
        },
        shoe: state.shoe.shift().shift().shift().shift(),
        currentPlayerHand: 0,
        bank: state.bank - state.betSize
      });

    case DRAW_PLAYER_CARD:
      if (
        StoreUtils.allPlayerHandsStood(state) ||
        state.playerHands.get(state.currentPlayerHand).stood
      ) {
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
          dealerHand: Object.assign({}, state.dealerHand, {
            cards: state.dealerHand.cards.push(state.shoe.get(0))
          }),
          shoe: state.shoe.shift()
        });
      }

      return state;

    case STAND:
      if (StoreUtils.allPlayerHandsStood(state)) {
        return state;
      }

      const standPlayerHand = StoreUtils.getPlayerHand(state);
      return Object.assign({}, state, {
        playerHands: state.playerHands.set(state.currentPlayerHand, Object.assign({}, standPlayerHand, {
          cards: state.playerHands.get(state.currentPlayerHand).cards,
          stood: true
        })),
        currentPlayerHand: state.currentPlayerHand + 1
      });

    case STAND_DEALER:
      return Object.assign({}, state, {
        dealerHand: Object.assign({}, state.dealerHand, { stood: true })
      })

    case REWARD_PLAYER:
      if (action.roundResult === GameUtils.HAND_RESULTS.PUSH) {
        return Object.assign({}, state, {
          bank: state.bank + StoreUtils.getPlayerHand(state, action.handIndex).bet
        });
      }

      if (action.roundResult === GameUtils.HAND_RESULTS.WIN) {
        return Object.assign({}, state, {
          bank: state.bank + StoreUtils.getPlayerHand(state, action.handIndex).bet * 2
        });
      }

      if (action.roundResult === GameUtils.HAND_RESULTS.BLACKJACK) {
        return Object.assign({}, state, {
          bank: state.bank + (StoreUtils.getPlayerHand(state, action.handIndex).bet * ((3 / 2) + 1))
        });
      }

      return state;

    case DOUBLE:
      const doublePlayerHand = StoreUtils.getPlayerHand(state);

      if (StoreUtils.allPlayerHandsStood(state) || doublePlayerHand.cards.size > 2) {
        return state;
      }

      return Object.assign({}, state, {
        playerHands: StoreUtils.setPlayerHandInList(
          state,
          Object.assign({}, doublePlayerHand, {
            cards: doublePlayerHand.cards.push(state.shoe.get(0)),
            bet: doublePlayerHand.bet * 2,
            stood: true
          })
        ),
        shoe: state.shoe.shift(),
        currentPlayerHand: state.currentPlayerHand + 1,
        bank: state.bank - doublePlayerHand.bet
      });

    case SPLIT:
      const splitPlayerHand = StoreUtils.getPlayerHand(state);

      if (
        StoreUtils.allPlayerHandsStood(state) ||
        splitPlayerHand.cards.size !== 2 ||
        CardUtils.getCardValue(splitPlayerHand.cards.get(0)) !==
        CardUtils.getCardValue(splitPlayerHand.cards.get(1))
      ) {
        return state;
      }

      return Object.assign({}, state, {
        playerHands: HandUtils.splitHand(state.currentPlayerHand, state.playerHands, state.shoe),
        shoe: state.shoe.shift().shift(),
        bank: state.bank - splitPlayerHand.bet
      });

    default:
      return state;
  }
}
